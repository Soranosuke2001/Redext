export type subbedSubreddit = {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  createdAt: Date;
  Subscription: {
    subredditId: string;
    subredditName: string;
    subredditCreator: string | null | undefined;
    subredditCreationDate: Date;
    subredditMemberCount: number;
  };
};
