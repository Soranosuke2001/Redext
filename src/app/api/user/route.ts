import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) return new Response("Invalid Query", { status: 400 });

    const result = await db.user.findFirst({
      where: {
        username,
      },
      include: {
        Subscription: {
          include: {
            subreddit: {
              include: {
                Creator: true,
              },
            },
          },
        },
      },
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
          subredditCreator: subreddit.subreddit.Creator?.username,
        };
      }),
    };

    console.log(updatedResult);

    return new Response(JSON.stringify(updatedResult));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
