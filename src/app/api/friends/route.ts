import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friends";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = addFriendValidator.parse(body.email);

    const res = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIST_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = (await res.json()).result as string | null;

    if (!data) {
      return new Response("This person does not exist.", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (data === session.user.id) {
      return new Response("You can't add yourself as a friend", {
        status: 400,
      });
    }
    // check if user is already added
    const isAlreadyAdded = (await fetchRedis(
        'sismember',
        `user:${data}:incoming_friend_requests`,
        session.user.id
      )) as 0 | 1
  
      if (isAlreadyAdded) {
        return new Response('Already added this user', { status: 400 })
      }
  
      // check if user is already friends
      const isAlreadyFriends = (await fetchRedis(
        'sismember',
        `user:${session.user.id}:friends`,
        data
      )) as 0 | 1
  
      if (isAlreadyFriends) {
        return new Response('Already friends with this user', { status: 400 })
      }

      await db.sadd(`user:${data}:incoming_friend_requests`, session.user.id)
  

    console.log(data);
  } catch (err) {}
}
