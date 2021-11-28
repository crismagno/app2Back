import { IUserRoom } from "./types";

export class UserRoom implements IUserRoom {
  public username: string;
  public room: string;
  public socketID: string;
  public avatar?: string;

  constructor(
    username: string,
    room: string,
    socketID: string,
    avatar?: string
  ) {
    this.username = username;
    this.room = room;
    this.socketID = socketID;
    this.avatar = avatar;
  }
}
