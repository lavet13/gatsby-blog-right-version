import { UserItemType } from '../user/user.types';

export type rawMessageItemType = {
  id: string;
  text: string;
  updatedAt?: number;
  createdAt?: number;
  sender: UserItemType;
  receiver: UserItemType;
};

export type MessageItemType = {
  id: string;
  text: string;
  updatedAt?: string;
  createdAt?: string;
  sender: UserItemType;
  receiver: UserItemType;
};

export type rawMessageEdgeType = {
  cursor: string;
  node: rawMessageItemType;
};

export type MessageEdgeType = {
  cursor: string;
  node: MessageItemType;
};

export type rawMessageConnection = {
  edges: rawMessageEdgeType[];
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  totalCount: number;
};

export type MessageConnection = {
  edges: MessageEdgeType[];
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  totalCount: number;
};
