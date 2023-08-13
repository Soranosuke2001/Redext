import { Post } from "@prisma/client";
import { FC } from "react";

interface ContentCardProps {
  postList: Post[];
}

const ContentCard: FC<ContentCardProps> = ({ postList }) => {
  console.log(postList);
  return (
    <div className="flex justify-between border border-solid border-slate-500 rounded-lg m-3">
      {/* Left Side */}
      <div className="flex flex-col">
        <div className="">Community Name</div>
        <div className="">Creation Date</div>
      </div>

      {/* Right Side */}
      <div className="">
        <button>View Community</button>
      </div>
    </div>
  );
};

export default ContentCard;
