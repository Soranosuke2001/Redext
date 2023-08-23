import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import SubredditCard from "./SubredditCard";

const CommunityList = async () => {
  // Fetch a list of communities
  const data = await db.subreddit.findMany({
    include: {
      subscribers: true,
      Creator: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  const sortedCommunities = data.sort(
    (community1, community2) =>
      community2.subscribers.length - community1.subscribers.length
  );

  const communities = sortedCommunities.map((community) => {
    return {
      subredditId: community.id,
      subredditName: community.name,
      subredditCreatorId: community.Creator?.id,
      subredditCreator: community.Creator?.username,
      subredditCreationDate: community.createdAt,
      subredditMemberCount: community.subscribers.length,
    };
  });

  console.log(communities[0]);

  return <SubredditCard communities={communities} />;
};

export default CommunityList;
