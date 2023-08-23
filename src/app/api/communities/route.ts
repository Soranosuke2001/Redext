import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    // Parsing the data received from the url
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    // Getting the posts that have not been loaded yet
    const data = await db.subreddit.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        subscribers: true,
        Creator: true,
      },
    });

    const sortedCommunities = data.sort(
      (community1, community2) =>
        community2.subscribers.length - community1.subscribers.length
    );

    const communities = sortedCommunities.map((community) => {
      return {
        subredditId: community.id,
        subredditName: community.name,
        subredditCreatorId: community.Creator?.id,
        subredditCreator: community.Creator?.username,
        subredditCreationDate: community.createdAt,
        subredditMemberCount: community.subscribers.length,
      };
    });

    return new Response(JSON.stringify(communities));
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Request Data", { status: 422 });
    }

    return new Response("Unable to retrieve more posts.", { status: 500 });
  }
}
