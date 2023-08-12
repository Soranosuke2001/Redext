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
    });

    console.log({ username });
    console.log({ result });

    return new Response(JSON.stringify(result));
  } catch (error) {}
}
