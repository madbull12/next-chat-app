"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Logo from "./Logo";

import { Separator } from "./ui/Separator";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Skeleton } from "./ui/Skeleton";
import { Input } from "./ui/Input";
import { FaSearch } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";
import SidebarChatList from "./SidebarChatList";
import ChatMenu from "./ChatMenu";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import RequestToast from "./RequestToast";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFriendsProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SearchFriendsInput: React.FC<SearchFriendsProps> = ({
  value,
  handleChange,
}) => {
  return (
    <div className="border border-input w-full rounded-lg flex items-center px-2">
      <FaSearch className="text-gray-500" />

      <Input
        value={value}
        type="text"
        placeholder="Search or start a new chat"
        className="border-none"
        onChange={handleChange}
      />
    </div>
  );
};

const Sidebar: React.FC<{
  unseenRequests: IncomingFriendRequest[];
  session: User;
  friends: User[];
}> = ({ unseenRequests, session, friends }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [filteredFriends, setFilteredFriends] = useState<User[]>(friends);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [unseenRequestsCount, setUnseenRequestsCount] = useState<number>(
    unseenRequests.length
  );

  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
    if (debouncedValue === "") {
      setFilteredFriends(friends);
    } else {
      const newValue = friends.filter((friend) =>
        friend.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setFilteredFriends(newValue);
    }
  }, [debouncedValue]);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/dashboard/requests") {
      setUnseenRequestsCount(0);
    }

    pusherClient.subscribe(
      toPusherKey(`user:${session.id}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${session.id}:friends`));

    const friendRequestHandler = ({
      senderImage,
      senderName,
    }: IncomingFriendRequest) => {
      setUnseenRequestsCount((prev) => prev + 1);
      const audio = new Audio("/audio/notification-sound.wav");

      audio.play();
      toast.custom((t) => (
        <RequestToast t={t} senderImg={senderImage} senderName={senderName} />
      ));
    };

    const addedFriendHandler = () => {
      setUnseenRequestsCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${session.id}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${session.id}:friends`));

      pusherClient.unbind("new_friend", addedFriendHandler);
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [pathname, session.id]);
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
          <ChatMenu unseenRequestsCount={unseenRequestsCount} />
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 ">
          <SearchFriendsInput value={searchValue} handleChange={handleChange} />
          <BsFilter className="text-2xl cursor-pointer" />
        </div>
      </div>
      <SidebarChatList  friends={filteredFriends} sessionId={session.id} />

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
