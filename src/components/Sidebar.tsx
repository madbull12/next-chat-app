import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { Separator } from "./ui/Separator";
import ProfileOption from "./ProfileOption";
interface LinkProps {
  baseUrl: string;
  title: string;
  icon: any;
}

const FriendRequestOption: React.FC<{ unseenRequest: number }> = ({
  unseenRequest,
}) => {
  return (
    <li className="group hover:bg-accent-primary hover:text-white rounded-lg p-2 relative">
      <Link
        href="/dashboard/requests"
        className="flex items-center gap-x-8"
      >
        <AiOutlineUser />

        <span>Friend Requests</span>
        {unseenRequest > 0 ? <span className="absolute -top-2 -right-2 bg-accent-secondary rounded-full w-4 h-4 text-xs grid place-items-center text-white ">{unseenRequest}</span> : null}
        
      </Link>
    </li>
  );
};

const Sidebar: React.FC<{ unseenRequest: number }> = ({ unseenRequest }) => {
  const links: LinkProps[] = [
    {
      baseUrl: "/dashboard",
      title: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      baseUrl: "/dashboard/chat",
      title: "Messages",
      icon: <BsFillChatDotsFill />,
    },
    {
      baseUrl: "/dashboard/add-friends",
      title: "Add Friends",
      icon: <AiOutlineUserAdd />,
    },
  ];
  return (
    <div className="px-4 min-h-screen  absolute left-0 top-0  max-w-[250px] border-r ">
      <div>
        <Logo fontSize="text-3xl" />
      </div>
      <Separator orientation="horizontal" className="my-1 bg-gray-300" />
      <ul className="list-none py-4 text-xl flex-col flex h-full ">
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
        <FriendRequestOption unseenRequest={unseenRequest} />

        {/* <li>
          <Link href="/messages" className="flex items-center gap-x-8">
            <RxDashboard className="text-gray-400" />
            <span>Messages</span>
          </Link>
        </li>

        <li>
          <Link href="/dashboard" className="flex items-center gap-x-8">
            <RxDashboard className="text-gray-400" />
            <span>Add Friend</span>
          </Link>
        </li> */}
      </ul>
      <ProfileOption />
    </div>
  );
};

export default Sidebar;
