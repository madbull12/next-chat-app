import Body from "@/components/Body";
import ChatLink from "@/components/ChatLink";
import SidebarChatList from "@/components/SidebarChatList";
import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  const friends = await getFriendsByUserId(session?.user?.id as string);
  console.log(friends);

  return (
    <Body>
      <div className="max-w-sm border-r p-2 min-h-screen ">
        <h1 className="text-2xl px-4 font-semibold">Chats</h1>
        <SidebarChatList friends={friends} />
      </div>

      {children}
    </Body>
  );
}