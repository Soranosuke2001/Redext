import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    // If the user ID is missing
    if (!userId) return new Response("Invalid Query", { status: 400 });

    // Find the user ID in the database
    const result = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        Subscription: {
          include: {
            subreddit: {
              include: {
                Creator: true,
                _count: true,
              },
            },
          },
        },
      },
      take: 10,
    });

    // If there was no matching username result
    if (!result) return new Response("Invalid Username", { status: 400 });

    const updatedResult = {
      id: result.id,
      name: result.name,
      username: result.username,
      image: result.image,
      createdAt: result.createdAt,
      Subscription: result.Subscription.map((subreddit) => {
        return {
          subredditId: subreddit.subredditId,
          subredditName: subreddit.subreddit.name,
          subredditCreatorId: subreddit.subreddit.Creator?.id,
          subredditCreator: subreddit.subreddit.Creator?.username,
          subredditCreationDate: subreddit.subreddit.createdAt,
          subredditMemberCount: subreddit.subreddit._count.subscribers,
        };
      }),
    };

    return new Response(JSON.stringify(updatedResult));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
