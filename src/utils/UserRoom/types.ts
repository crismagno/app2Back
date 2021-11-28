import { IRoom } from "../SocketRooms/types";

export interface IUserRoom {
  username: string;
  room: IRoom["name"];
  socketID: string;
  avatar?: string;
}
