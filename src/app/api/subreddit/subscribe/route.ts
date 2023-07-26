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

    // Check if the user is already subscribed to the subreddit
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists) {
      return new Response("You are already subscribed!", { status: 400 });
    }

    // Subscribe the user to the subreddit
    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response('Invalid Request Data', { status: 422 });
    }

    return new Response("Unable to subscribe the user.", { status: 500 });
  }
}
