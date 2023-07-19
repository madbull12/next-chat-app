import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils";

export async function POST(req:Request) {
    const { chatId,userId } =await req.json();
    try {
        await pusherServer.trigger(toPusherKey(`typing-channel:${chatId}`),"typing-event",{ userId });
        return new Response("OK")

    } catch(err) {
        return new Response('Internal Server Error', { status: 500 })
    }
}