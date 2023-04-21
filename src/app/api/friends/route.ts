import { authOptions } from "@/lib/auth";
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

    console.log(data);
  } catch (err) {}
}
