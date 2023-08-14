"use client";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import UserProfile from "./UserProfile";
import { Separator } from "../ui/Separator";
import MiniNavbar from "./MiniNavbar";
import CommunityCard from "./CommunityCard";
import type { subbedSubreddit } from "@/types/subredditSubscription";

interface UserInfoProps {
  userId: string;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const [navOption, setNavOption] = useState<string>("Joined Communities");

  const [joinedCommunitiesQuery, upvotesQuery, downvotesQuery] = useQueries({
    queries: [
      {
        queryKey: ["joinedCommunities"],
        queryFn: async () => {
          const { data } = (await axios.get(
            `/api/user/communities?userId=${userId}`
          )) as subbedSubreddit;

          return data;
        },
        enabled: navOption === "Joined Communities",
      },
      {
        queryKey: ["upvotes"],
        queryFn: async () => {
          const { data } = (await axios.get(
            `/api/user/votes?userId=${userId}&voteType=UP`
          ));

          return data;
        },
        enabled: navOption === "Upvotes",
      },
      {
        queryKey: ["downvotes"],
        queryFn: async () => {
          const { data } = (await axios.get(
            `/api/user/votes?userId=${userId}&voteType=DOWN`
          ));

          return data;
        },
        enabled: navOption === "Downvotes",
      },
    ],
  });

  return (
    <>
      {/* Loading Skeleton */}
      {joinedCommunitiesQuery.isFetching || !joinedCommunitiesQuery.data ? (
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
            image={joinedCommunitiesQuery.data.image}
            createdAt={joinedCommunitiesQuery.data.createdAt}
            username={joinedCommunitiesQuery.data.username}
          />
        </div>
      )}

      {/* Bottom Half: User Activities */}
      <div className="flex flex-col justify-center items-center">
        <Separator className="my-8 bg-slate-400" />
      </div>

      <MiniNavbar
        isFetching={joinedCommunitiesQuery.isFetching}
        setNavOption={setNavOption}
        navOption={navOption}
      />

      {/* Contents */}
      <div className="my-8">
        {joinedCommunitiesQuery.isFetching || !joinedCommunitiesQuery.data ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
          </div>
        ) : (
          <CommunityCard subscriptions={joinedCommunitiesQuery.data.Subscription} />
        )}
      </div>
    </>
  );
};

export default UserInfo;
