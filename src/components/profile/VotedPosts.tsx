"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { FC, useRef } from "react";
import EditorOutput from "../EditorOutput";
import { MessageSquare } from "lucide-react";

interface VotedPostsProps {
  posts:
    | {
        id: string;
        title: string;
        content: Prisma.JsonValue;
        createdAt: string;
        creator: string;
        creatorId: string;
        subredditName: string;
        subredditId: string;
        commentCount: number;
      }[];
}

const VotedPosts: FC<VotedPostsProps> = ({ posts }) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    // Same code as the posts shown on the home page, but without the voting option
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post) => {
        return (
          <div className="rounded-md bg-white dark:bg-neutral-800 shadow-lg dark:shadow-zinc-800" key={post.id}>
            <div className="flex px-6 py-4 justify-between">
              <div className="w-0 flex-1">
                <div className="max-h-40 mt-1 text-xs text-zinc-900 dark:text-neutral-400">
                  {post.subredditName ? (
                    <>
                      <a
                        href={`/r/${post.subredditName}`}
                        className="underline text-sm underline-offset-2"
                      >
                        r/{post.subredditName}
                      </a>
                      <span className="px-1">•</span>
                    </>
                  ) : null}
                  <span>
                    Posted by u/
                    <Link href={`/user/${post.creatorId}`}>{post.creator}</Link>
                  </span>{" "}
                  {formatTimeToNow(new Date(post.createdAt))}
                </div>

                <a
                  href={`/r/${post.subredditName}/post/${post.id}`}
                >
                  <h1 className="text-2xl font-semibold py-2 leading-6 text-gray-900 dark:text-white">
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

            <div className="bg-gray-50 dark:bg-zinc-900 rounded-md z-20 text-sm p-4 sm:px-6">
              <a
                href={`/r/${post.subredditName}/post/${post.id}`}
                className="w-fit flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" /> {post.commentCount}{" "}
                comments
              </a>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default VotedPosts;
