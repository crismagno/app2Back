import { IRoom } from "../SocketRooms/types";

export interface IUserRoom {
  userId: string;
  username: string;
  room: IRoom["name"];
  socketID: string;
  avatar?: string;
  userColor?: string;
}
