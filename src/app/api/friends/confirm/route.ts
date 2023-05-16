import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { confirmRequestValidator } from "@/lib/validations/confirm-request";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = confirmRequestValidator.parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd

    );

    if (isAlreadyFriends) {
      return new Response("Already friends!!", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    console.log(hasFriendRequest)
    if(!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });

    }

    await db.sadd(`user:${session.user.id}:friends`,idToAdd)
    await db.sadd(`user:${idToAdd}:friends`,session.user.id)

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
