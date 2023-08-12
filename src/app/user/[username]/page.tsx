"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PageProps {
  params: {
    username: string;
  };
}

const page = ({ params }: PageProps) => {
  const { username } = params;

  const {
    data: userResult,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user?username=${username}`);

      return data;
    },
    queryKey: ["search-user"],
  });

  console.log({ userResult });
  return <div>{username}</div>;
};

export default page;
