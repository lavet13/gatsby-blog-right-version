import { UserItemType } from '../user/user.types';

export type RoleItemType = {
  id: string;
  name: string;
  users?: UserItemType[];
};
