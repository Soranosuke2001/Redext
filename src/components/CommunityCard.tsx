import { FC } from "react";
import { Button } from "./ui/Button";
import { format } from "date-fns";

interface CommunityCardProps {
  subscriptions: {
    subredditId: string;
    subredditName: string;
    subredditCreator: string;
    subredditCreationDate: string;
    subredditMemberCount: number;
  }[];
}

const CommunityCard: FC<CommunityCardProps> = ({ subscriptions }) => {
  return (
    <>
      {subscriptions.map((subscription) => {
        const creationDate = new Date(subscription.subredditCreationDate);

        return (
          <div
            key={subscription.subredditId}
            className="flex justify-between border border-solid border-gray-200 rounded-lg m-3 bg-gray-200"
          >
            {/* Left Side */}
            <div className="flex flex-col m-3">
              <span className="text-sm text-zinc-600">
                {`Created By: u/${subscription.subredditCreator}`}
              </span>
              <span className="text-4xl font-ibm-plex-mono">{`r/${subscription.subredditName}`}</span>
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
              <Button className="border-2 border-solid border-black p-2">
                View Community
              </Button>

              <span className="text-end">{`Members: ${subscription.subredditMemberCount}`}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommunityCard;
