import Body from "@/components/Body";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const RequestsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
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

  console.log(incomingFriendRequests)
  return (
    <Body>
      <div className="p-4">
      <FriendRequests friendRequests={incomingFriendRequests} />

      </div>
    </Body>
  );
};

export default RequestsPage;
