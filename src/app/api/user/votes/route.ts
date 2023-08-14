import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return new Response("Invalid Query", { status: 400 });

    const result = await db.vote.findMany({
        where: {
            userId
        },
    })

    console.log(result);

    // If there was no matching username result
    if (!result) return new Response("Invalid Username", { status: 400 });

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response("There was an error fetching user data", {
      status: 500,
    });
  }
}
