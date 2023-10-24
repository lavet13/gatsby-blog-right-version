import { MessageItemType } from '../message/message.types';
import { RoleItemType } from '../role/role.types';

export type rawUserItemType = {
  id: string;
  username: string;
  email: string;
  createdAt?: number;
  updatedAt?: number;
  receiverMessages?: MessageItemType[];
  senderMessages?: MessageItemType[];
  roles?: RoleItemType[];
};

export type UserItemType = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  receiverMessages?: MessageItemType[];
  senderMessages?: MessageItemType[];
  roles?: RoleItemType[];
};
