"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

const SignoutButton = () => {

  return (
    <button onClick={()=>signOut({redirect:true,callbackUrl:"/login"})} className="flex items-center w-full hover:bg-accent-primary h-full hover:text-white px-4 py-2 rounded-lg gap-x-2">
      <AiOutlineLogout />
      <span>Sign out</span>

    </button>
  )
}

const ProfileOption: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger className="flex items-center cursor-pointer mt-auto gap-2">
        <Image
          className="rounded-full"
          alt="profile-picture"
          src={session?.user.image as string}
          height={30}
          width={30}
        />
        <div className="text-start">
          <p className="text-base">{session?.user.name}</p>
          <p className="text-xs text-gray-500">{session?.user.email}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <SignoutButton />
      </PopoverContent>
    </Popover>
  );
};

export default ProfileOption;
