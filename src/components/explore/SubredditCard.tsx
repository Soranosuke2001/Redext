"use client";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { subredditParams } from "@/types/profile";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from "react";

interface SubredditCardProps {
  communities: subredditParams[];
}

const SubredditCard: FC<SubredditCardProps> = ({
  communities,
}: SubredditCardProps) => {
  const lastCommunityRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastCommunityRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query-subreddits"],
    async ({ pageParam = 1 }) => {
      const query = `/api/communities?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios.get(query);

      return data as subredditParams[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [communities],
        pageParams: [1],
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (!data) return null;

  const subreddits = data.pages.flatMap((page) => page) ?? communities;

  return (
    <ul className="flex flex-col space-y-6">
      {subreddits.length > 0 ? (
        <>
          {subreddits.map((community, index) => {
            if (index === subreddits.length - 1) {
              return (
                <li key={community.subredditId} ref={ref} className="">
                  {community.subredditName}
                </li>
              );
            } else {
              return (
                <div key={community.subredditId} className="">
                  {community.subredditName}
                </div>
              );
            }
          })}
        </>
      ) : null}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  );
};

export default SubredditCard;
