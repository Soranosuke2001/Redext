"use client";

import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface UsernameFormProps {
  user: Pick<User, "id" | "username">;
}

const UsernameForm: FC<UsernameFormProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = {
        name,
      };

      const { data } = await axios.patch(`/api/username`, payload);
      return data;
    },
    // If an error response was returned from the api while creating a new subreddit
    onError: (err) => {
      if (err instanceof AxiosError) {
        // If the post already exists
        if (err.response?.status === 409) {
          return toast({
            title: "Username Already Exists",
            description: "Please choose a different username.",
            variant: "destructive",
          });
        }
      }

      // Handling any other error
      toast({
        title: "An Error Occurred",
        description:
          "Apologies. We were unable to change your username. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Username Updated!",
        description: "Your username was successfully updated.",
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((e) => {
        updateUsername(e);
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Username</CardTitle>
          <CardDescription>
            Please enter a new username to be displayed
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc400">u/</span>
            </div>

            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register("name")}
            />

            {errors?.name && (
              <p className="px-1 text-xc text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className="dark:bg-black dark:hover:bg-neutral-900" isLoading={isLoading}>Change Name</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UsernameForm;
