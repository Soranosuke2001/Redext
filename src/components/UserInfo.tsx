"use client";

import { Post, Subscription, Vote } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { format } from "date-fns";
import { Separator } from "./ui/Separator";

interface UserInfoProps {
  image: string;
  createdAt: string;
  Post: Post;
  Subscription: Subscription;
  Vote: Vote;
  username: string;
}

const UserInfo = ({
  image,
  createdAt,
  Post,
  Subscription,
  Vote,
  username,
}: UserInfoProps) => {
  // Returned response is a string, so converting back to a Date object
  const joinedDate = new Date(createdAt);

  const activityOptions = ["Joined Communities", "Upvotes", "Downvotes"];

  return (
    <>
      {/* Top Half: Basic User Info */}
      <div className="flex">
        {/* User Profile Picture */}
        <UserAvatar
          user={{ image, name: username }}
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
        />

        {/* Username and Account Creation Date */}
        <div className="ml-5 md:ml-10">
          <p className="text-lg md:text-3xl text-zinc-900">{`u/${username}`}</p>
          <div className="md:flex md:mt-2">
            <dt className="text-md text-zinc-500">Member Since:</dt>
            <dd className="text-md text-zinc-500 ml-2">
              <time dateTime={joinedDate.toDateString()}>
                {format(joinedDate, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
        </div>
      </div>

      {/* Bottom Half: User Activities */}
      <div className="flex flex-col justify-center items-center">
        <Separator className="my-8 bg-black" />
      </div>

      {/* Mini NavBar */}
      <div className="w-full flex justify-around">
        {activityOptions.map((option, index) => (
          <div
            key={index}
            className="text-md relative after:bg-black after:absolute after:h-1 after:w-0 after:-bottom-1/3 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            <button className="">{option}</button>
          </div>
        ))}
      </div>

      {/* Contents */}
      <div className=""></div>
    </>
  );
};

export default UserInfo;
