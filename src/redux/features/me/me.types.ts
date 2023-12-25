import { SignInFormValues } from '../../../pages/sign-in';
import { UserItemType } from '../user/user.types';

export type Me = UserItemType;

export type getUserPayload = {
  values: SignInFormValues;
};
