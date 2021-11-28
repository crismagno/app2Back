import { IUserRoom } from "../UserRoom/types";

export interface IRoom {
  userKing: IUserRoom;
  name: string;
  users: IUserRoom[];
}
