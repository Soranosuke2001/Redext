"use client";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import UserProfile from "./UserProfile";
import { Separator } from "../ui/Separator";
import MiniNavbar from "./MiniNavbar";
import MiniNavbarDropDown from "./MiniNavbarDropDown";
import type { subbedSubreddit, votes } from "@/types/profile";
import ProfileContents from "./ProfileContents";

interface UserInfoProps {
  userId: string;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const [navOption, setNavOption] = useState<string>("Joined Communities");
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // Query to fetch the subbed subreddits and upvoted/downvoted posts
  const [userInfoQuery, joinedCommunitiesQuery, upvotesQuery, downvotesQuery] =
    useQueries({
      queries: [
        {
          queryKey: ["userInfo"],
          queryFn: async () => {
            const { data } = await axios.get(`/api/user?userId=${userId}`);
            setFirstLoad(false);

            return data;
          },
          enabled: firstLoad === true,
        },
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
            )) as votes;

            return data;
          },
          enabled: navOption === "Upvotes",
        },
        {
          queryKey: ["downvotes"],
          queryFn: async () => {
            const { data } = (await axios.get(
              `/api/user/votes?userId=${userId}&voteType=DOWN`
            )) as votes;

            return data;
          },
          enabled: navOption === "Downvotes",
        },
      ],
    });

  return (
    <>
      {/* Loading Skeleton */}
      {userInfoQuery.isFetching ? (
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
            image={userInfoQuery.data.image}
            createdAt={userInfoQuery.data.createdAt}
            username={userInfoQuery.data.username}
          />
        </div>
      )}

      {/* Bottom Half: User Activities */}
      <div className="flex flex-col justify-center items-center">
        <Separator className="my-8 bg-slate-400" />
      </div>

      <div className="hidden md:block">
        <MiniNavbar
          isFetching={joinedCommunitiesQuery.isFetching}
          setNavOption={setNavOption}
          navOption={navOption}
        />
      </div>

      <div className="md:hidden">
        <MiniNavbarDropDown
          isFetching={joinedCommunitiesQuery.isFetching}
          setNavOption={setNavOption}
          navOption={navOption}
        />
      </div>

      {/* Contents */}
      <div className="my-8">
        {joinedCommunitiesQuery.isFetching ||
        upvotesQuery.isFetching ||
        downvotesQuery.isFetching ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
            <Skeleton className="h-[150px] w-[90%] bg-slate-400 m-4 justify-center" />
          </div>
        ) : (
          <ProfileContents
            navOption={navOption}
            subbedSubreddits={joinedCommunitiesQuery.data?.Subscription}
            upvotePosts={upvotesQuery.data}
            downvotePosts={downvotesQuery.data}
          />
        )}
      </div>
    </>
  );
};

export default UserInfo;
