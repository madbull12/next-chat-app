import ChatInput from "@/components/ChatInput";
import ChatWrapper from "@/components/ChatWrapper";
import Messages from "@/components/Messages";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound, useRouter } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const [userId1, userId2] = params.chatId.split("--");
  const { user } = session;

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;

  return { title: `discu. | ${chatPartner.name} chat` };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )

    const dbMessages = results.map((message) => JSON.parse(message) as Message)

    // const reversedDbMessages = dbMessages.reverse()

    const messages = messageArrayValidator.parse(dbMessages)

    return messages
  } catch (error) {
    notFound()
  }
}

const ChatMessagesPage = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  // new

  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;
  const initialMessages = await getChatMessages(chatId);
  return (
    <ChatWrapper>
      <header className="flex sticky  top-0 right-0 items-center gap-2 p-2 backdrop-blur-md bg-white/30">
        <Avatar>
          <AvatarImage
            src={chatPartner.image as string}
            height={80}
            width={80}
          />
          <AvatarFallback>{chatPartner.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <p className="text-xl ">{chatPartner.name}</p>
          <p className="text-sm text-gray-500">{chatPartner.email}</p>
        </div>
      </header>
      <div className="p-2">
        <Messages chatId={chatId} initialMessages={initialMessages} chatPartner={chatPartner} />
        <ChatInput chatId={chatId} chatPartner={chatPartner} />
      </div>
    </ChatWrapper>
  );
};

export default ChatMessagesPage;
