import { Subscription } from "@prisma/client";
import { FC } from "react";

interface CommunityCardProps {
  subscriptions: Subscription[];
}

const CommunityCard: FC<CommunityCardProps> = ({ subscriptions }) => {
  return (
    <>
      {subscriptions.map((subscription) => (
        <div className="flex justify-between border border-solid border-slate-500 rounded-lg m-3">
          {/* Left Side */}
          <div className="flex flex-col">
            <div className=""></div>
            <div className="">Creation Date</div>
          </div>

          {/* Right Side */}
          <div className="">
            <button>View Community</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunityCard;
