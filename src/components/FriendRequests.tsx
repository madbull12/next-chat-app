"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Skeleton } from "./ui/Skeleton";
import RequestToast from "./RequestToast";

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

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${session?.user?.id}:incoming_friend_requests`)
    );
    console.log(
      "listening to ",
      `user:${session?.user?.id}:incoming_friend_requests`
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
      senderName,
      senderImage,
    }: IncomingFriendRequest) => {
      console.log(senderId,"function got called",senderImage,senderName);
      setFriendRequests((prev) => [
        ...prev,
        { senderId, senderName, senderImage,senderEmail },
      ]);
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

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${session?.user?.id}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [session?.user.id]);

  const confirmRequestHandle = async (id: string) => {
    await toast.promise(
      axios.post("/api/friends/confirm", {
        id,
      }),
      {
        loading: "Adding friend...",
        success: "Friend added",
        error: (err: AxiosError) => ` ${err.response?.data}`,
      }
    );
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== id)
    );
  };

  const ignoreRequestHandle = async (id: string) => {
    await toast.promise(
      axios.post("/api/friends/ignore", {
        id,
      }),
      {
        loading: "Removing friend's request...",
        success: "Request removed",
        error: (err: AxiosError) => ` ${err.response?.data}`,
      }
    );
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== id)
    );
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <div className="flex items-center  w-full flex-col">
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
        <div className="">
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
                  <Skeleton className="w-[80px] h-[80px] rounded-full border-gray-200 " />

                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{request.senderName}</p>
                  <p className="text-sm text-gray-500">{request.senderEmail}</p>
                  <div className="flex items-center gap-x-2 mt-2">
                    <Button
                      onClick={() => confirmRequestHandle(request.senderId)}
                    >
                      Confirm
                    </Button>
                    <Button variant={"outline"} onClick={()=>ignoreRequestHandle(request.senderId)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequests;
