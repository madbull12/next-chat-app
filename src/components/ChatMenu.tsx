import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { toast } from "react-hot-toast";
import RequestToast from "./RequestToast";
interface ChatMenuProps {
  unseenRequests: IncomingFriendRequest[];
  user:User;
}
const ChatMenu = ({ unseenRequests,user }:ChatMenuProps ) => {
  const [initialUnseenRequests,setInitialUnseenRequests] = useState<IncomingFriendRequest[]>(unseenRequests);
  const [unseenRequestsCount,setUnseenRequestsCount] = useState<number>(unseenRequests.length);

  const pathname = usePathname()
  useEffect(()=>{
    if(pathname === "/dashboard/requests") {
      setUnseenRequestsCount(0)
    }

      pusherClient.subscribe(
        toPusherKey(`user:${user.id}:incoming_friend_requests`)
      );
      pusherClient.subscribe(toPusherKey(`user:${user.id}:friends`));
  
      const friendRequestHandler = () => {
        setUnseenRequestsCount((prev) => prev + 1);
        // const audio = new Audio('/audio/notification-sound.wav');

        // audio.play();
        // toast.custom((t)=>(
        //   <RequestToast
        //     t={t}
        //     senderImg={senderImage}
        //     senderName={senderName}
        //   />
        // ))
      };
  
      const addedFriendHandler = () => {
        setUnseenRequestsCount((prev) => prev - 1);
      };
  
      pusherClient.bind("incoming_friend_requests", friendRequestHandler);
      pusherClient.bind("new_friend", addedFriendHandler);
  
      return () => {
        pusherClient.unsubscribe(
          toPusherKey(`user:${user.id}:incoming_friend_requests`)
        );
        pusherClient.unsubscribe(toPusherKey(`user:${user.id}:friends`));
  
        pusherClient.unbind("new_friend", addedFriendHandler);
        pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
      };
  },[pathname,user.id])
  return (
    <div className="z-[999]">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <BsFillChatDotsFill className="text-xl cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 bg-white" side="right" align="start">
          <DropdownMenuLabel>New Chat</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="space-x-2 relative  cursor-pointer hover:bg-slate-200">
            <FaUserFriends />
            <Link href="/dashboard/requests">Friend Requests</Link>
            {unseenRequestsCount !== 0 ?   <div className="w-4 absolute top-0 text-xs place-items-center grid right-0 h-4 rounded-full text-white bg-accentPrimary">
              {unseenRequestsCount}
            </div> : null}
          
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatMenu;
