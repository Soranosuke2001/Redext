import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const voteType = url.searchParams.get("voteType");

    if (!userId || !voteType)
      return new Response("Invalid Query", { status: 400 });

    // Fetch the post ID where the user voted
    const result = await db.vote.findMany({
      where: {
        userId,
      },
      take: 50,
    });

    console.log(result);

    // If there was no matching username result
    if (!result) return new Response("Invalid Username", { status: 400 });

    // Filter the posts with either UP or DOWN votes
    // Returns a list of post IDs
    const votedPosts = result
      .filter((post) => post.type === voteType)
      .map((post) => post.postId);

    // Fetch the posts with the corresponding post ID
    const posts = await db.post.findMany({
      where: {
        id: {
          in: votedPosts,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        subreddit: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            _count: true,
          },
        },
      },
    });

    // Returning a modified version of the result (easier to understand)
    const updatedPosts = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        creator: post.author.username || post.author.id,
        creatorId: post.author.id,
        subredditName: post.subreddit.name,
        subredditId: post.subreddit.id,
        commentCount: post.comments.length,
      };
    });

    return new Response(JSON.stringify(updatedPosts));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
