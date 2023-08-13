"use client";

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
  // const { image, createdAt, Post, Subscription, Vote } = userResult;

  if (isFetched) console.log(typeof data.createdAt);

  const activityOptions = ["Joined Communities", "Upvotes", "Downvotes"];

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
            Post={data.Post}
            Subscription={data.Subscription}
            Vote={data.Vote}
            username={data.username}
          />
        </div>
      )}
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

export default page;
