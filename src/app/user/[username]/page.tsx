"use client";

import ContentCard from "@/components/ContentCard";
import UserInfo from "@/components/UserInfo";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { useQuery as FetchUser } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface PageProps {
  params: {
    username: string;
  };
}

const page = ({ params }: PageProps) => {
  const { username } = params;

  const [navOption, setNavOption] = useState<string>("Joined Communities");

  const { data, isFetched, isFetching, isError, error } = FetchUser({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user?username=${username}`);

      return data;
    },
    queryKey: ["search-user"],
  });

  if (isFetched) console.log(data);

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
            username={data.username}
          />
        </div>
      )}

      {/* Bottom Half: User Activities */}
      <div className="flex flex-col justify-center items-center">
        <Separator className="my-8 bg-slate-400" />
      </div>

      {/* Mini NavBar */}
      <div className="w-full flex justify-around">
        {activityOptions.map((option, index) => (
          <div
            key={index}
            className="text-md relative after:bg-black after:absolute after:h-1 after:w-0 after:-bottom-1/3 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            <button
              className={`${
                navOption === option ? "font-bold" : "text-slate-500"
              }`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>

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
          <ContentCard postList={data.Post} />
        )}
      </div>
    </>
  );
};

export default page;
