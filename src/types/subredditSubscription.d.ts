export type subbedSubreddit = {
  data: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    createdAt: string;
    Subscription: {
      subredditId: string;
      subredditName: string;
      subredditCreator: string | null | undefined;
      subredditCreationDate: Date;
      subredditMemberCount: number;
    }[];
  } | null;
};
