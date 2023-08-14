import { Prisma } from "@prisma/client";
import { FC } from "react";
import CommunityCard from "./CommunityCard";

interface ProfileContentsProps {
  navOption: string;
  subbedSubreddits:
    | {
        subredditId: string;
        subredditName: string;
        subredditCreator: string | null | undefined;
        subredditCreationDate: Date;
        subredditMemberCount: number;
      }[]
    | undefined;
  upvotePosts:
    | {
        id: string;
        title: string;
        content: Prisma.JsonValue;
        createdAt: string;
        creator: string;
        creatorId: string;
        subredditName: string;
        subredditId: string;
      }
    | undefined;
  downvotePosts:
    | {
        id: string;
        title: string;
        content: Prisma.JsonValue;
        createdAt: string;
        creator: string;
        creatorId: string;
        subredditName: string;
        subredditId: string;
      }
    | undefined;
}

const ProfileContents: FC<ProfileContentsProps> = ({
  navOption,
  subbedSubreddits,
  upvotePosts,
  downvotePosts,
}) => {
  if (navOption === "Joined Communities") {
    if (!subbedSubreddits) return <div>No Data Available</div>
    return <CommunityCard subscriptions={subbedSubreddits} />;
  } else if (navOption === "Upvotes") {
    return <div className="">Upvotes</div>;
  } else {
    return <div className="">Downvotes</div>;
  }
};

export default ProfileContents;
