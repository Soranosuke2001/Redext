"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import Link from "next/link";

type PartialVote = Pick<Vote, "type">;
interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  subredditName,
  post,
  commentAmt,
  votesAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white dark:bg-neutral-800 shadow-lg dark:shadow-zinc-800">
      <div className="flex px-2 md:px-6 py-4 justify-between">
        <PostVoteClient
          initialVotesAmt={votesAmt}
          postId={post.id}
          initialVote={currentVote?.type}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 dark:text-neutral-400 flex">
            {subredditName ? (
              <>
                <a
                  href={`/r/${subredditName}`}
                  className="underline text-zinc-900 dark:text-neutral-400 text-sm underline-offset-2"
                >
                  r/{subredditName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span className="hidden md:block mr-1">
              Posted by u/
              <Link href={`/user/${post.author.id}`}>
                {post.author.username}
              </Link>
            </span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={`/r/${subredditName}/post/${post.id}`} className="">
            <h1 className="text-2xl font-semibold py-2 leading-6 text-gray-900 dark:text-gray-200">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-zinc-900 z-20 text-sm p-4 sm:px-6 rounded-md">
        <a
          href={`/r/${subredditName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </a>
      </div>
    </div>
  );
};

export default Post;
