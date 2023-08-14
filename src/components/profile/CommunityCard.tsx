import { format } from "date-fns";
import { Users } from "lucide-react";

interface CommunityCardProps {
  subscriptions: {
    subredditId: string;
    subredditName: string;
    subredditCreator: string | null | undefined;
    subredditCreationDate: Date;
    subredditMemberCount: number;
  }[];
}

const CommunityCard = ({ subscriptions }: CommunityCardProps) => {
  return (
    <>
      {/* Map over each subreddit that the user is subbed to */}
      {subscriptions.map((subscription) => {
        const creationDate = new Date(subscription.subredditCreationDate);

        return (
          <div
            key={subscription.subredditId}
            className="flex justify-between border border-solid border-gray-200 rounded-lg m-3 bg-gray-100"
          >
            {/* Left Side */}
            <div className="flex flex-col m-3">
              <span className="text-sm text-zinc-600">
                {`Created By: u/${subscription.subredditCreator}`}
              </span>
              <span className="text-4xl font-sans tracking-wide">{`r/${subscription.subredditName}`}</span>
              <div className="my-5" />
              <div className="flex">
                <dt className="text-zinc-700">Creation Date:</dt>
                <dd className="text-zinc-700 ml-1">
                  <time dateTime={creationDate.toDateString()}>
                    {format(creationDate, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-between m-3">
              <a
                href={`/r/${subscription.subredditName}`}
                className="border-2 border-solid border-black p-3 bg-gray-900 text-slate-100 rounded-lg"
              >
                View Community
              </a>

              <div className="flex justify-end">
                <span className="mr-2 text-xl">
                  {subscription.subredditMemberCount}
                </span>
                <Users />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommunityCard;
