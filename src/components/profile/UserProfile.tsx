"use client";

import UserAvatar from "../UserAvatar";
import { format } from "date-fns";

interface UserProfileProps {
  image: string | null;
  createdAt: string;
  username: string | null;
}

const UserProfile = ({
  image,
  createdAt,
  username,
}: UserProfileProps) => {
  // Returned response is a string, so converting back to a Date object
    const joinedDate = new Date(createdAt);

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
          <p className="text-lg md:text-3xl text-zinc-900 dark:text-white">{`u/${username}`}</p>
          <div className="md:flex md:mt-2">
            <dt className="text-md text-zinc-500 dark:text-gray-400">Member Since:</dt>
            <dd className="text-md text-zinc-500 dark:text-gray-400 md:ml-2">
              <time dateTime={joinedDate.toDateString()}>
                {format(joinedDate, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
