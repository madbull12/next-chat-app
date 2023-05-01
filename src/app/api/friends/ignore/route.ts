import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({id:z.string()}).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    //remove incoming requests
    await db.srem(`user:${session.user.id}:incoming_friend_requests`,idToAdd)

    return new Response("OK")
  } catch (err) {
    console.log(err);
    if(err instanceof z.ZodError) {
        return new Response("Invalid request payload",{ status:422})
    }
  }
}
