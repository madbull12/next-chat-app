"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface MessagesProps {
  initialMessages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { data: session } = useSession();
  return (
    <div>
      {messages.map((message, i) => {
        const isCurrentUser = message.senderId === session?.user.id;

        const hasNextMessageFromSameUser =
          messages[i - 1]?.senderId === messages[i].senderId;
        return (
          <div>
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
                    "bg-indigo-600 text-white": isCurrentUser,
                    "bg-gray-200 text-gray-900": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    {/* {formatTimestamp(message.timestamp)} */}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
