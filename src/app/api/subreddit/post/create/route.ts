import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // Check if the user is already logged in
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the subreddit ID and post contents
    const body = await req.json();
    const { subredditId, title, content } = PostValidator.parse(body);

    // Check if the user is already subscribed to the subreddit
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You must be subscribed to the community in order to post", { status: 400 });
    }

    // Create the new post to the subreddit
    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    });

    return new Response("OK");
  } catch (error) {
    // If the entered post data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Post Request Data", { status: 422 });
    }

    return new Response("Unable to post in the community. Please try again later.", { status: 500 });
  }
}
