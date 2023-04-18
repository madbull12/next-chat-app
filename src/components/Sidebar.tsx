import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
interface LinkProps {
  baseUrl: string;
  title: string;
  icon: any;
}

const Sidebar: React.FC = () => {
  const links = [
    {
      baseUrl: "/dashboard",
      title: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      baseUrl: "/messages",
      title: "Messages",
      icon: <BsFillChatDotsFill />,
    },
    {
      baseUrl: "/add-friends",
      title: "Add Friends",
      icon: <AiOutlineUserAdd />,
    },
  ];
  return (
    <div className="p-4 min-h-screen max-w-[250px] border-r ">
      <div className="border-b border-gray-300">
        <Logo fontSize="text-3xl" />
      </div>
      <ul className="list-none py-4 text-xl ">
        {links.map((link, i) => (
          <li
            key={i}
            className="group hover:bg-blue-600 hover:text-white rounded-lg p-2"
          >
            <Link href={link.baseUrl} className="flex items-center gap-x-8">
              {link.icon}

              <span>{link.title}</span>
            </Link>
          </li>
        ))}

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
    </div>
  );
};

export default Sidebar;
