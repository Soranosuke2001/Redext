import CommentSection from "@/components/CommentSection";
import EditorOutput from "@/components/EditorOutput";
import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

// To avoid loading old and stale data (Next.js caching)
export const dynamic = 'force-dynamic';
export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  // Fetch the post from Redis if it exists
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  // If the post is not cached, fetch from database
  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  // If the post was not found
  if (!post && !cachedPost) return notFound();

  return (
    <>
      <div className="flex h-full sm:items-start justify-between">
        <div>

        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>
        </div>

        <div className="sm:w-0 w-full flex-1 bg-white dark:bg-neutral-800 p-4 rounded-sm">
          {/* Post Details */}
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500 dark:text-neutral-400">
            Posted by u/{post?.author.username ?? cachedPost.authorUsername}{" "}
            {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
          </p>

          {/* Post Title */}
          <h1 className="text-2xl font-semibold py-2 leading-6 text-gray-900 dark:text-white">
            {post?.title ?? cachedPost.title}
          </h1>

          {/* Post Content */}
          <EditorOutput content={post?.content ?? cachedPost.content} />

          <Suspense
            fallback={<Loader2 className="h-5 w5 animate-spin text-zinc-500" />}
          >
            {/* @ts-expect-error server component */}
            <CommentSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      {/* Up Vote Button */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* Loading Spinner */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* Down Vote Button */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}

export default page;
