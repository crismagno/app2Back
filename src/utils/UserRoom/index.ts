import { IUserRoom } from "./types";

export class UserRoom implements IUserRoom {
  public userId: string;
  public username: string;
  public room: string;
  public socketID: string;
  public avatar?: string;

  constructor(
    userId: string,
    username: string,
    room: string,
    socketID: string,
    avatar?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.room = room;
    this.socketID = socketID;
    this.avatar = avatar;
  }
}
