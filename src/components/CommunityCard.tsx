import { Subscription } from "@prisma/client";
import { FC } from "react";
import { Button } from "./ui/Button";

interface CommunityCardProps {
  subscriptions: Subscription[];
}

const CommunityCard: FC<CommunityCardProps> = ({ subscriptions }) => {
  return (
    <>
      {subscriptions.map((subscription) => (
        <div className="flex justify-between border border-solid border-slate-500 rounded-lg m-3">
          {/* Left Side */}
          <div className="flex flex-col m-2">
            <span className="text-sm text-zinc-500">
              Created By: u/Soranosuke
            </span>
            <span className="text-4xl font-ibm-plex-mono">r/testing</span>
            <div className="my-5" />
            <div className="">Creation Date: August 23, 2023</div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-between">
            <Button className="border-2 border-solid border-black m-2 p-2">
              View Community
            </Button>

            <span className="text-end m-2">Members: 2</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunityCard;
