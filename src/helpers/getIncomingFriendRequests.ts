import { getCurrentUser } from "@/lib/session";
import { fetchRedis } from "./redis";

export const getIncomingFriendRequests = async () => {
  const user = await getCurrentUser();
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${user?.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const parsedSender = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: parsedSender.email,
        senderImage: parsedSender.image,
        senderName: parsedSender.name,
      };
    })
  );

  return incomingFriendRequests;
};

