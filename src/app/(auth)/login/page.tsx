"use client";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { signIn } from "next-auth/react";
import Logo from "@/components/Logo";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex text-center justify-center items-center min-h-screen">
      <Card className="space-y-2 rounded-lg">
        <CardHeader className="space-y-4">
          <CardTitle className="border-b  border-gray-300">
            <Logo fontSize="text-5xl" />
          </CardTitle>
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button isLoading={isLoading}  variant="outline" onClick={loginWithGoogle} className="flex items-center gap-x-2 font-semibold">
              {!isLoading ? <FcGoogle /> : null}
              

              <span>Continue with google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
