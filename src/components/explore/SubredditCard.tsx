import { subredditParams } from "@/types/profile";
import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SubredditCardProps {
  community: subredditParams;
}

const SubredditCard: FC<SubredditCardProps> = ({ community }) => {
    const createdAt = new Date(community.subredditCreationDate)
  return (
    <div
      key={community.subredditId}
      className="flex justify-between border border-solid border-gray-200 dark:border-neutral-600 rounded-lg m-3 bg-gray-100 dark:bg-neutral-800"
    >
      {/* Left Side */}
      <div className="flex flex-col m-3">
        <Link
          href={`/user/${community.subredditCreatorId}`}
          className="text-sm text-zinc-600 dark:text-neutral-400"
        >
          {`Created By: u/${community.subredditCreator}`}
        </Link>
        <span className="text-4xl font-sans tracking-wide">{`r/${community.subredditName}`}</span>
        <div className="my-5" />
        <div className="flex">
          <dt className="text-zinc-700 dark:text-neutral-400 hidden md:block">
            Creation Date:
          </dt>
          <dd className="text-zinc-700 dark:text-neutral-400 md:ml-1">
            <time dateTime={createdAt.toDateString()}>
              {format(createdAt, "MMMM d, yyyy")}
            </time>
          </dd>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-between m-3">
        <a
          href={`/r/${community.subredditName}`}
          className="flex border-2 border-solid border-black p-3 bg-gray-900 dark:bg-black dark:hover:bg-neutral-900 text-slate-100 rounded-lg"
        >
          View<span className="hidden md:block ml-1">Community</span>
        </a>

        <div className="flex justify-end">
          <span className="mr-2 text-xl">{community.subredditMemberCount}</span>
          <Users />
        </div>
      </div>
    </div>
  );
};

export default SubredditCard;
