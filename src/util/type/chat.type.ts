import type { TUser } from './user.type';

export type TChatInfo = {
  id: number | string;
  firstName: TUser['first_name'];
  lastName: TUser['first_name'];
};

export type TChatMessage = {
  id: number | string;
  userId: TUser['id'];
  createdAt: Date;
  text: string;
};
