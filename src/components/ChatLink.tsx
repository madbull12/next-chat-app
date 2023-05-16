"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import Link from "next/link";

interface Props {
  user: User;
}

const ChatLink = ({ user }: Props) => {
  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer hover:bg-gray-200 gap-2 p-4">
        <Avatar>
          <AvatarImage src={user.image as string} height={80} width={80} />
          <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <p>{user.name}</p>
      </div>
    </Link>
  );
};

export default ChatLink;
