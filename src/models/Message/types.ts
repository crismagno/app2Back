export interface IMessage {
  id: string | number;
  userName: string;
  userId: string;
  room: string | number | any;
  message: string;
  createdAt: Date | string;
  colorGenerate: string;
}
