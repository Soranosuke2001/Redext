"use client";

import { FC, useState } from "react";
import { Command, CommandInput } from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma, Subreddit } from "@prisma/client";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [userInput, setUserInput] = useState<string>("");

  const {
    data: queryResult,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!userInput) return [];

      const { data } = await axios.get(`/api/search?q=${userInput}`);
      return data as Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      };
    },
    queryKey: ["search-query"],
    // Makes the fetch request when the user types
    enabled: false,
  });

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={userInput}
        onValueChange={(text) => {
          setUserInput(text);
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Seach Communities..."
      />
    </Command>
  );
};

export default SearchBar;
