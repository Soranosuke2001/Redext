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
            subreddit: true,
          },
        },
      },
    });

    if (!result) return new Response("Invalid Username", { status: 400 });

    console.log(result.Subscription);

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
