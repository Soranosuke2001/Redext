"use client";

import UserInfo from "@/components/UserInfo";
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
  // const { image, createdAt, Post, Subscription, Vote } = userResult;

  if (isFetched) console.log(typeof data.createdAt);

  return (
    <>
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
          <UserInfo
            image={data.image}
            createdAt={data.createdAt}
            Post={data.Post}
            Subscription={data.Subscription}
            Vote={data.Vote}
            username={data.username}
          />
        </div>
      )}
    </>
  );
};

export default page;
