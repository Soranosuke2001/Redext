import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  // If the user is logged in, find which communities the user is following
  let followedCommunitiesIds: string[] = [];
  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subreddit: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map(
      ({ subreddit }) => subreddit.id
    );
  }

  try {
    // Parsing the data received from the url
    const { limit, page, subredditName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subredditName: z.string().nullish().optional(),
      })
      .parse({
        subredditName: url.searchParams.get("subredditName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    // Constructing the where clause for easier prisma code
    let whereClause = {};

    if (subredditName) {
      whereClause = {
        subreddit: {
          name: subredditName,
        },
      };
    } else if (session) {
      whereClause = {
        subreddit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    // Getting the posts that have not been loaded yet
    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subreddit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Request Data", { status: 422 });
    }

    return new Response("Unable to retrieve more posts.", { status: 500 });
  }
}
