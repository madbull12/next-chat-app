import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

interface ChatMenuProps {
  unseenRequestsCount:number;
}
const ChatMenu = ({ unseenRequestsCount }:ChatMenuProps ) => {

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
          <DropdownMenuItem className="space-x-2 relative  cursor-pointer hover:bg-slate-200">
            <FaUserPlus />
            <Link href="/dashboard/add-friends">Add friends</Link>

         
          
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatMenu;
