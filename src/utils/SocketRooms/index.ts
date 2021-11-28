import { IUserRoom } from "../UserRoom/types";
import { IRoom } from "./types";

export class SocketRooms {
  public static users: IUserRoom[] = [];
  public static rooms: IRoom[] = [];

  public static setUser(user: IUserRoom): IUserRoom[] {
    this.users.push(user);
    this.setUserOnRoom(user);
    return this.users;
  }

  public static removeUser(user: IUserRoom): IUserRoom[] {
    const indexUser: number = this.users.findIndex(
      (userRoom) => userRoom.socketID === user.socketID
    );
    // this.users.slice(indexUser);
    this.users = this.users.filter(
      (userSR) => userSR.socketID !== user.socketID
    );
    this.removeUserOnRoom(user);
    return this.users;
  }

  private static setUserOnRoom(user: IUserRoom): IRoom[] {
    if (this.rooms.length <= 0) {
      this.rooms.push({
        userKing: user,
        name: user.room,
        users: [user],
      });
      return this.rooms;
    }

    const indexRoomByUserRoom: number = this.rooms.findIndex(
      (room) => room.name === user.room
    );

    if (indexRoomByUserRoom > -1) {
      this.rooms[indexRoomByUserRoom].users.push(user);
      return this.rooms;
    } else {
      this.rooms.push({
        userKing: user,
        name: user.room,
        users: [user],
      });
      return this.rooms;
    }
  }

  private static removeUserOnRoom(user: IUserRoom): IRoom[] {
    if (this.rooms.length <= 0) {
      return this.rooms;
    }

    const indexRoomByUserRoom: number = this.rooms.findIndex(
      (room) => room.name === user.room
    );

    if (this.rooms.length === 1 && this.rooms[0].users.length === 1) {
      this.rooms = [];
      return this.rooms;
    }

    if (indexRoomByUserRoom > -1) {
      if (this.rooms[indexRoomByUserRoom].users.length === 1) {
        this.rooms[indexRoomByUserRoom].users = [];
        return this.rooms;
      }

      this.rooms[indexRoomByUserRoom].users = this.rooms[
        indexRoomByUserRoom
      ].users.filter(
        (userRoom: IUserRoom) => userRoom.socketID !== user.socketID
      );
      return this.rooms;
    }
  }
}
