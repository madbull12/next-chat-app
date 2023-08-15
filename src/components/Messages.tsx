"use client";
import { chatDateFormat, cn, toPusherKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { Message } from "@/lib/validations/message";
import { format } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  chatPartner: User;
  chatId: string;
  user: User;
}

const MessagesDate = ({ date }: { date: string }) => {
  const timestamp = Date.now();
  const today = chatDateFormat(timestamp);
  const yesterday = chatDateFormat(timestamp - 24 * 60 * 60 * 1000);

  const getDisplayDate = () => {
    if (today === date) return "Today";
    if (yesterday === date) return "Yesterday";
    return date;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="p-2 w-[100px] grid place-items-center rounded-lg bg-slate-200 text-slate-500 text-xs ">
        {getDisplayDate()}
      </div>
    </div>
  );
};

const Messages: React.FC<MessagesProps> = ({
  initialMessages,
  chatPartner,
  chatId,
  user,
}) => {
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);



  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      const audio = new Audio("/audio/message-pop.mp3");
      audio.play();
      setMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, [chatId]);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  const mappedMessages = messages.map((message) => {
    return {
      date: chatDateFormat(message.timestamp),
      ...message,
    };
  });

  // console.log(mappedMessages)

  const arrangedMessagesByDay = mappedMessages?.reduce((acc, cur, i) => {
    const existingGroup = acc.find((group) => group.date === cur.date);
    console.log(cur);
    if (existingGroup) {
      existingGroup.messages.push(cur);
    } else {
      acc.push({ date: cur.date, messages: [cur] as Message[] });
    }

    return acc;
  }, [] as { date: string; messages: Message[] }[]);

  console.log(arrangedMessagesByDay);

  return (
    <div>
      {arrangedMessagesByDay?.map((message) => (
        <>
          <MessagesDate date={message.date} />
          {message.messages.map((message, i) => {
            const isCurrentUser = message.senderId === user.id;

            // console.log(arrangedMessagesByDay);
            // const isTheSameDay = format(message.timestamp,"yy-MM-dd") === format(messages[i + 1]?.timestamp,"yy-MM-dd");
            // console.log(isTheSameDay)
            const hasNextMessageFromSameUser =
              messages[i + 1]?.senderId === messages[i].senderId;
            return (
              <div className="p-4" key={i}>
                <div
                  className={cn("flex items-end", {
                    "justify-end": isCurrentUser,
                  })}
                >
                  <div
                    className={cn(
                      "flex flex-col space-y-2 max-w-xs mx-2 text-base   ",
                      {
                        "order-1 items-end": isCurrentUser,
                        "order-2 items-start": !isCurrentUser,
                      }
                    )}
                  >
                    <span
                      className={cn("px-4 py-2 rounded-lg inline-block", {
                        "bg-accentPrimary text-white": isCurrentUser,
                        "bg-gray-200 text-gray-900": !isCurrentUser,
                        "rounded-br-none":
                          !hasNextMessageFromSameUser && isCurrentUser,
                        "rounded-bl-none":
                          !hasNextMessageFromSameUser && !isCurrentUser,
                      })}
                    >
                      {message.text}{" "}
                      <span
                        className={cn("ml-2 text-[10px] text-gray-100", {
                          "text-gray-400 ": !isCurrentUser,
                        })}
                      >
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </span>
                  </div>
                  <div
                    className={cn("relative w-6 h-6 ", {
                      "order-2": isCurrentUser,
                      "order-1": !isCurrentUser,

                      invisible: hasNextMessageFromSameUser,
                    })}
                  >
                    <Image
                      fill
                      src={
                        isCurrentUser
                          ? (user.image as string)
                          : chatPartner.image
                      }
                      alt="Profile picture"
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ))}
    </div>
  );
};

export default Messages;
