import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  // Find if the subreddit exists
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  // Check if the user is already subscribed, if not signed in, undefined
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  // Change to a boolean
  const isSubscribed = !!subscription;

  // Return 404 not found if the subreddit doesnt exist
  if (!subreddit) return notFound();

  // Checking the number of subscribed members
  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  const postCount = await db.post.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl md:mx-auto h-full md:pt-12">
      <div className="grid gri-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="flex flex-col col-span-2 space-y-6">{children}</div>

        {/* Info Side Bar */}
        <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 dark:border-neutral-600 order-first md:order-last">
          <div className="px-6 py-4">
            <p className="font-semibold py-3">About r/{subreddit.name}</p>
          </div>

          {/* Community creation date */}
          <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white dark:bg-neutral-800">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500 dark:text-neutral-300">Created</dt>
              <dd className="text-gray-700 dark:text-neutral-300">
                <time dateTime={subreddit.createdAt.toDateString()}>
                  {format(subreddit.createdAt, "MMMM d, yyyy")}
                </time>
              </dd>
            </div>

            {/* Number of community members */}
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500 dark:text-neutral-300">Members</dt>
              <dd className="text-gray-700">
                <div className="text-gray-900 dark:text-neutral-300">
                  {memberCount}
                </div>
              </dd>
            </div>

            {/* Number of posts created */}
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500 dark:text-neutral-300">Posts</dt>
              <dd className="text-gray-700">
                <div className="text-gray-900 dark:text-neutral-300">
                  {postCount}
                </div>
              </dd>
            </div>

            {/* If the user logged in is the community creator */}
            {subreddit.creatorId === session?.user.id ? (
              <div className="flex justify-between gap-x-4 py-3">
                <p className="text-gray-500 dark:text-neutral-300">
                  You are the community creator!
                </p>
              </div>
            ) : null}

            {/* Button to join or leave the community */}
            {subreddit.creatorId !== session?.user.id ? (
              <SubscribeLeaveToggle
                subredditId={subreddit.id}
                subredditName={subreddit.name}
                isSubscribed={isSubscribed}
              ></SubscribeLeaveToggle>
            ) : null}

            <Link
              className={buttonVariants({
                variant: "outline",
                className: "w-full mb-6 dark:border-none",
              })}
              href={`r/${slug}/submit`}
            >
              Create Post
            </Link>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Layout;
