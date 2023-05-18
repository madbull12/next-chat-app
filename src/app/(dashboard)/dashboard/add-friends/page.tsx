import AddFriendForm from "@/components/AddFriendForm";
import Body from "@/components/Body";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";

const AddFriendPage:React.FC = () => {
  return (
    <Body>
      <div className="space-y-2 p-4">
        <h1 className="text-3xl font-semibold">Start a chat</h1>
        <AddFriendForm />
      </div>
    </Body>
  );
};

export default AddFriendPage;
