"use client";

import CommunityCard from "@/components/CommunityCard";
import MiniNavbar from "@/components/MiniNavbar";
import UserInfo from "@/components/UserInfo";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { useQuery as FetchUser } from "@tanstack/react-query";
import axios from "axios";

interface PageProps {
  params: {
    username: string;
  };
}

const page = ({ params }: PageProps) => {
  const { username } = params;

  const { data, isFetched, isFetching, isError, error } = FetchUser({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user?username=${username}`);

      return data;
    },
    queryKey: ["search-user"],
  });

  if (isFetched) console.log(data);


  return (
    <>
      {/* Loading Skeleton */}
      {isFetching ? (
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
          <UserInfo
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

      <MiniNavbar />

      {/* Contents */}
      {/* <div className="my-8 border-solid border-slate-500 rounded-lg border-2 border-spacing-2"> */}
      <div className="my-8">
        {isFetching ? (
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

export default page;
