"use client";

import { FC, useCallback, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma, Subreddit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [userInput, setUserInput] = useState<string>("");
  const router = useRouter();

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!userInput) return [];

      const { data } = await axios.get(`/api/search?q=${userInput}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    // Makes the fetch request when the user types
    enabled: false,
  });

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const request = debounce(async () => {
    refetch();
  }, 500);

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={userInput}
        onValueChange={(text) => {
          setUserInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Seach Communities..."
      />

      {userInput.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No Results Found</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map((subreddit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`);
                    router.refresh();
                  }}
                  key={subreddit.id}
                  value={subreddit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;
