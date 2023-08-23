import { Prisma } from "@prisma/client";

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
      subredditCreatorId: string | null | undefined;
      subredditCreator: string | null | undefined;
      subredditCreationDate: Date;
      subredditMemberCount: number;
    }[];
  } | null;
};

export type votes = {
  data: {
    id: string;
    title: string;
    content: Prisma.JsonValue;
    createdAt: string;
    creator: string;
    creatorId: string;
    subredditName: string;
    subredditId: string;
    commentCount: number;
  }[];
};

export type subredditParams = {
  subredditId: string;
  subredditName: string;
  subredditCreatorId: string | null | undefined;
  subredditCreator: string | null | undefined;
  subredditCreationDate: Date;
  subredditMemberCount: number;
}
