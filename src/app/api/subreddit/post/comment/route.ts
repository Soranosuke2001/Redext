import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    // Parsing the data
    const body = await req.json();
    const { postId, text, replyToId } = CommentValidator.parse(body);

    // Check if the user is logged in
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    // Save the comment in the database
    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    });

    return new Response("OK");
  } catch (error) {
    // If the entered data is invalid
    if (error instanceof z.ZodError) {
      return new Response("Invalid Request Data", { status: 422 });
    }

    return new Response("Unable to save the comment.", { status: 500 });
  }
}
