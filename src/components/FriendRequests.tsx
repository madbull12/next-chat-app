"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FriendRequestProps {
  friendRequests: IncomingFriendRequest[];
}
const FriendRequests: React.FC<FriendRequestProps> = ({
  friendRequests: _friendRequests,
}) => {
  const { data: session } = useSession();
  const [friendRequests, setFriendRequests] =
    useState<IncomingFriendRequest[]>(_friendRequests);
  console.log(_friendRequests);

  const confirmRequestHandle = async (id: string) => {
    await toast.promise(
      axios.post("/api/friends/confirm", {
        id,
      }),
      {
        loading: "Adding friend...",
        success: "Friend added",
        error: "Oops something went wrong",
      }
    );
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== id)
    );
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <div className="flex items-center flex-col">
          <Image
            width={250}
            height={250}
            alt="nothing image"
            src="/messaging-1.svg"
          />
          <p className="text-xl font-bold">There's nothing to show here</p>
          <p>Friend requests will appear here</p>
        </div>
      ) : (
        <>
          <p className="text-xl font-bold">Friend requests</p>
          <div className="mt-4 space-y-4">
            {friendRequests?.map((request) => (
              <div className="flex items-start gap-x-2" key={request.senderId}>
                <Avatar>
                  <AvatarImage
                    src={request.senderImage as string}
                    height={80}
                    width={80}
                  />
                  <AvatarFallback>
                    {request.senderEmail?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{request.senderName}</p>
                  <p className="text-sm text-gray-500">{request.senderEmail}</p>
                  <div className="flex items-center gap-x-2 mt-2">
                    <Button
                      onClick={() => confirmRequestHandle(request.senderId)}
                      className="bg-accent-primary hover:bg-accent-secondary"
                    >
                      Confirm
                    </Button>
                    <Button variant={"outline"}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FriendRequests;
