"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";

import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { Separator } from "./ui/Separator";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Skeleton } from "./ui/Skeleton";
import { Input } from "./ui/Input";
import { FaSearch } from "react-icons/fa";
import { BsFillChatDotsFill, BsFilter } from 'react-icons/bs'
import SidebarChatList from "./SidebarChatList";

const FriendRequestOption: React.FC<{ initialUnseenRequestsCount: number }> = ({
  initialUnseenRequestsCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestsCount
  );

  const { data: session } = useSession();

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${session?.user.id}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${session?.user.id}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id}:friends`));

      pusherClient.unbind("new_friend", addedFriendHandler);
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [session?.user.id]);
  return (
    <li className="group hover:bg-accent-primary hover:text-white rounded-lg p-2 relative">
      <Link href="/dashboard/requests" className="flex items-center gap-x-8">
        <AiOutlineUser />

        <span>Friend Requests</span>
        {unseenRequestCount > 0 ? (
          <span className="absolute -top-2 -right-2 bg-accent-secondary rounded-full w-4 h-4 text-xs grid place-items-center text-white ">
            {unseenRequestCount}
          </span>
        ) : null}
      </Link>
    </li>
  );
};

const Sidebar: React.FC<{ unseenRequest: number; session: User,friends:User[] }> = ({
  unseenRequest,
  session,
  friends
}) => {
  return (
    <div className=" min-h-screen bg-white fixed  left-0 top-0 w-1/4 border-r ">
      <div className="px-4">
        <Logo fontSize="text-3xl" />
      </div>
      <Separator orientation="horizontal" className="my-1 bg-gray-300" />
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between">
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.image} alt="@shadcn" />
            <AvatarFallback>
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-100" />
            </AvatarFallback>
          </Avatar>
          <BsFillChatDotsFill className="text-xl cursor-pointer" />
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 ">
          <div className="border border-input w-full rounded-lg flex items-center px-2">
            <FaSearch  className="text-gray-500"/>

            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="border-none"
            />
          </div>
          <BsFilter className="text-2xl cursor-pointer" />
        </div>
       
      </div>
      <SidebarChatList friends={friends} sessionId={session.id} />


      {/* <ul className="list-none py-4 text-xl flex-col flex h-full ">
        {links.map((link, i) => (
          <li
            key={i}
            className="group hover:bg-accent-primary hover:text-white rounded-lg p-2"
          >
            <Link href={link.baseUrl} className="flex items-center gap-x-8">
              {link.icon}

              <span>{link.title}</span>
            </Link>
          </li>
        ))}
        <FriendRequestOption initialUnseenRequestsCount={unseenRequest} />

      </ul> */}
    </div>
  );
};

export default Sidebar;
