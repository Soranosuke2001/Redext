"use client";

import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";
import { Github } from "lucide-react";

// Bu adding this, the custom component is now able to accept all the props that can be accepted by a regular div component
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setGoogleLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      // Alert the user there was an error logging in
      toast({
        title: "Login Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setGithubLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      // Alert the user there was an error logging in
      toast({
        title: "Login Error",
        description: "There was an error logging in with GitHub",
        variant: "destructive",
      });
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={googleLoading}
        size="sm"
        className="w-full dark:bg-neutral-800 dark:hover:bg-neutral-600"
      >
        {googleLoading ? null : <Icons.google className="w-4 h-4 mr-2" />}
        Google
      </Button>
      <Button
        onClick={loginWithGitHub}
        isLoading={githubLoading}
        size="sm"
        className="w-full dark:bg-neutral-800 dark:hover:bg-neutral-600"
      >
        {githubLoading ? null : <Github className="h-4 w-4 mr-2" />}
        GitHub
      </Button>
    </div>
  );
};

export default UserAuthForm;
