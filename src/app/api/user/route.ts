import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return new Response("Invalid Query", { status: 400 });

    // Fetch the user data
    const result = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!result)
      return new Response("Invalid user ID provided", { status: 400 });

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
