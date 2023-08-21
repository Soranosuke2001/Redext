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
        subredditCreatorId: string | null | undefined;
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

    // Checking if there is a list of upvoted posts
    if (upvotePosts.length === 0)
      return (
        <div className="flex justify-center pt-10">
          The user has not upvoted any posts
        </div>
      );

    return <VotedPosts posts={upvotePosts} />;
  } else {
    // Since 1 option is always selected
    // Raises no-return JSX error

    // Checking if the data exists
    if (!downvotePosts) return <div>No Data Available</div>;

    // Checking if there is a list of downvoted posts
    if (downvotePosts.length === 0)
      return (
        <div className="flex justify-center pt-10">
          The user has not downvoted any posts
        </div>
      );
    return <VotedPosts posts={downvotePosts} />;
  }
};

export default ProfileContents;
