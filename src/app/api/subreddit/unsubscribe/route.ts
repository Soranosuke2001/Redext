import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // Check if the user is already logged in
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the subreddit ID
    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    // Check if the user is not subscribed yet
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You are not subscribed!", { status: 400 });
    }

    // Check if the user is the creator of the subreddit
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id,
      },
    });

    if (subreddit) {
      return new Response("Unable to subscribe from your own community", {
        status: 400,
      });
    }

    // Unsubscribe the user to the subreddit
    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    });

    return new Response(subredditId);
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Request Data", { status: 422 });
    }

    return new Response("Unable to unsubscribe the user.", { status: 500 });
  }
}
