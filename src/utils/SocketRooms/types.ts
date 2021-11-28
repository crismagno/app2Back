export interface IUserRoom {
  username: string;
  room: IRoom["name"];
  socketID: string;
}

export interface IRoom {
  userKing: IUserRoom;
  name: string;
  users: IUserRoom[];
}
