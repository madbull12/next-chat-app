"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import Link from "next/link";
import { Skeleton } from "./ui/Skeleton";

interface Props {
  user: User;
  href:string;
}

const ChatLink = ({ user,href }: Props) => {
  return (
    <Link href={`/dashboard/chat/${href}`}>
      <div className="flex items-center cursor-pointer hover:bg-gray-200 gap-2 p-4">
        <Avatar>
          <AvatarImage src={user.image as string} height={80} width={80} />
          <AvatarFallback>
            <Skeleton className="rounded-full w-[80px] h-[80px] bg-gray-200"  />
          </AvatarFallback>
        </Avatar>
        
        <p>{user.name}</p>
      </div>
    </Link>
  );
};

export default ChatLink;
