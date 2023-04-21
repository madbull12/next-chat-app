"use client";

import { Input } from "./ui/Input";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFriendValidator } from "@/lib/validations/add-friends";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { toast } from "react-hot-toast";
// interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;
const AddFriendForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });
  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      })
      await toast.success("Friend added")
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        toast.error(`${error.message}`);
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        toast.error(`${error.message}`);

        return;
      }

      toast.error(`Oops... something went wrong`);

    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <>
      <p>You can start a chat by adding a friend with emails below here</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full  items-center space-x-2 "
      >
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="ring-accent-secondary"
        />
        <Button
          type="submit"
          disabled={watch("email") === ""}
          className="bg-accent-primary whitespace-nowrap hover:bg-accent-secondary"
        >
          Add friend
        </Button>

      </form>
    </>
  );
};

export default AddFriendForm;
