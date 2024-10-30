export interface IUser {
  email: string;
  name: string;
}

export interface IOrderOwner extends IUser {
  createdAt: string;
  updatedAt: string;
}
