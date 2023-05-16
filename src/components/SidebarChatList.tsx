"use client";

import React, { useEffect, useState } from "react";
import ChatLink from "./ChatLink";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface Props {
  friends: User[];
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}
const SidebarChatList = ({ friends }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);
  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);
  return (
    <ul>
      {friends?.sort().map((friend, i) => (
        <ChatLink
          key={i}
          user={friend}
          href={chatHrefConstructor(session?.user?.id as string, friend.id)}
        />
      ))}
    </ul>
  );
};

export default SidebarChatList;
