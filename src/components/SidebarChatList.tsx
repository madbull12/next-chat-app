"use client";

import React, { useState } from "react";
import ChatLink from "./ChatLink";
import { usePathname,useRouter } from "next/navigation";

interface Props {
  friends: User[];
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}
const SidebarChatList = ({ friends }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);

  return (
    <ul>
      {friends?.sort().map((friend, i) => (
        <ChatLink key={i} user={friend} />
      ))}
    </ul>
  );
};

export default SidebarChatList;
