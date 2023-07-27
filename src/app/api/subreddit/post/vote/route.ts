import { CACHE_AFTER_UPVOTES } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/lib/validators/vote";
import { CachedPost } from "@/types/redis";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = req.json();
    const { postId, voteType } = PostVoteValidator.parse(body);

    // Check if the user is logged in
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Check if the user has already voted for the post
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    // Check if the post exists
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!post) return new Response("Post Not Found", { status: 404 });

    if (existingVote) {
      // Cancelling the previous vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id,
            },
          },
        });
        return new Response("OK");
      }

      // The user voted for a different vote type
      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      });

      // Updating total vote count
      const votesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;

        return acc;
      }, 0);

      // Storing the post in Redis cache if number of upvotes is greater than 10
      if (votesAmt >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedPost = {
          authorUsername: post.author.username ?? "",
          content: JSON.stringify(post.content),
          id: post.id,
          title: post.title,
          currentVote: voteType,
          createdAt: post.createdAt,
        };

        // Saving the post in Redis
        await redis.hset(`post:${postId}`, cachePayload);
      }

      return new Response("OK");
    }

    // Create the new vote if the user has not voted yet
    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId,
      },
    });

    // Updating total vote count
    const votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;

      return acc;
    }, 0);

    // Storing the post in Redis cache if number of upvotes is greater than 10
    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPost = {
        authorUsername: post.author.username ?? "",
        content: JSON.stringify(post.content),
        id: post.id,
        title: post.title,
        currentVote: voteType,
        createdAt: post.createdAt,
      };

      // Saving the post in Redis
      await redis.hset(`post:${postId}`, cachePayload);
    }

    return new Response("OK");
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Request Data", { status: 422 });
    }

    return new Response("Unable to update your vote.", { status: 500 });
  }
}
