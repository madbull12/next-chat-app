"use client";

import React, { useEffect, useState } from "react";
import ChatLink from "./ChatLink";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { toast } from "react-hot-toast";
import UnseenChatToast from "./UnseenChatToast";

interface Props {
  friends: User[];
  sessionId:string;
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}
const SidebarChatList = ({ friends,sessionId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);
  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }

    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const newFriendHandler = () => {
      router.refresh();
    }

    const chatHandler = (message:ExtendedMessage) => {
      const shouldNotify = pathname !== `/dashboard/chat/${chatHrefConstructor(sessionId,message.senderId)}`
      if(!shouldNotify) return;

      toast.custom((t)=>(
        <UnseenChatToast
          t={t}
          sessionId={sessionId}
          senderId={message.senderId}
          senderImg={message.senderImg}
          senderMessage={message.text}
          senderName={message.senderName}
        />
      ))

      
      setUnseenMessages((prev) => [...prev, message])
    }

    pusherClient.bind("new_message",chatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("new_message",chatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
    }



  }, [pathname]);
  return (
    <ul className="sticky overflow-y-scroll top-0">
      {friends?.sort().map((friend, i) => (
        <ChatLink
          key={i}
          user={friend}
          href={chatHrefConstructor(sessionId as string, friend.id)}
        />
      ))}
    </ul>
  );
};

export default SidebarChatList;
