"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import UserProfile from "./UserProfile";
import { Separator } from "../ui/Separator";
import MiniNavbar from "./MiniNavbar";
import CommunityCard from "./CommunityCard";
import type { subbedSubreddit } from "@/types/subredditSubscription";

interface UserInfoProps {
  username: string;
}

const UserInfo = ({ username }: UserInfoProps) => {
  const [navOption, setNavOption] = useState<string>("Joined Communities");

  const { data, isFetched, isFetching, isError, error } = useQuery({
    // Fetching user information from database
    queryFn: async () => {
      const { data } = (await axios.get(
        `/api/user?username=${username}`
      )) as subbedSubreddit;

      return data;
    },
    queryKey: ["search-user"],
  });

  return (
    <>
      {/* Loading Skeleton */}
      {isFetching || !data ? (
        <div className="flex">
          <Skeleton className="w-[200px] h-[200px] rounded-full bg-slate-400" />
          <div className="ml-9">
            <Skeleton className="w-[350px] h-[70px] rounded-md bg-slate-400" />
            <br />
            <Skeleton className="w-[500px] h-[50px] rounded-md bg-slate-400" />
          </div>
        </div>
      ) : (
        <div>
          {/* Basic User Info */}
          <UserProfile
            image={data.image}
            createdAt={data.createdAt}
            username={data.username}
          />
        </div>
      )}

      {/* Bottom Half: User Activities */}
      <div className="flex flex-col justify-center items-center">
        <Separator className="my-8 bg-slate-400" />
      </div>

      <MiniNavbar
        isFetching={isFetching}
        setNavOption={setNavOption}
        navOption={navOption}
      />

      {/* Contents */}
      <div className="my-8">
        {isFetching || !data ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
          </div>
        ) : (
          <CommunityCard subscriptions={data.Subscription} />
        )}
      </div>
    </>
  );
};

export default UserInfo;
