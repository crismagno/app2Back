export interface IMessage {
  id: string | number;
  userName: string;
  userId: string;
  chatId: string | number | any;
  message: string;
  createdAt: Date | string;
  colorGenerate: string;
}
