import { Prisma } from "@prisma/client";
import { FC } from "react";
import CommunityCard from "./CommunityCard";
import VotedPosts from "./VotedPosts";

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
        commentCount: number;
      }[]
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
        commentCount: number;
      }[]
    | undefined;
}

const ProfileContents: FC<ProfileContentsProps> = ({
  navOption,
  subbedSubreddits,
  upvotePosts,
  downvotePosts,
}) => {
  if (navOption === "Joined Communities") {
    // Checking if the data exists
    if (!subbedSubreddits) return <div>No Data Available</div>;

    return <CommunityCard subscriptions={subbedSubreddits} />;
  } else if (navOption === "Upvotes") {
    // Checking if the data exists
    if (!upvotePosts) return <div>No Data Available</div>;

    return <VotedPosts posts={upvotePosts} />;
  } else {
    // Since 1 option is always selected
    // Raises no-return JSX error

    // Checking if the data exists
    if (!downvotePosts) return <div>No Data Available</div>;

    return <VotedPosts posts={downvotePosts} />;
  }
};

export default ProfileContents;
