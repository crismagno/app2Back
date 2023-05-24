import { Server, Socket } from "socket.io";
import { Log } from "../../helpers/Log";
import { EModules, LogColorsStatus } from "../../helpers/Log/types";
import { IMessage } from "../../models/Message/types";
import { SocketRedis } from "../SocketRedis";
import { SocketRooms } from "../SocketRooms";
import { UserRoom } from "../UserRoom";
import { IUserRoom } from "../UserRoom/types";
import http from "http";

export class SocketSocial {
  private _io: any;

  constructor(private server: http.Server) {
    this._io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  public start(): void {
    Log.show("Starting socket...", EModules.SOCKET_SOCIAL);

    try {
      SocketRedis.start(this._io);
      this._io.on("connection", (socket: Socket) => {
        const user: IUserRoom = this._socketQueryToUserRoom(socket);

        SocketRooms.setUser(user);

        this._socketEmit(user);

        this._socketOn(socket);

        this._socketOnDisconnect(socket, user);
      });
    } catch (error) {
      Log.show(
        `Error socket start ${String(error)}`,
        EModules.SOCKET_SOCIAL,
        LogColorsStatus.SUCCESS
      );
    }
  }

  /**
   * create user by socket handshake query
   * @param socket
   * @returns IUserRoom
   */
  private _socketQueryToUserRoom(socket: Socket): IUserRoom {
    return new UserRoom(
      String(socket.handshake.query.userId),
      String(socket.handshake.query.username),
      String(socket.handshake.query.room),
      socket.id,
      String(socket.handshake.query.avatar || ""),
      String(socket.handshake.query.userColor || "")
    );
  }

  /**
   * listen socket on
   * @param socket - socket connected
   */
  private _socketOn(socket: Socket) {
    socket.on("emitNewMessage", (data: IMessage): void => {
      this._io.compress(true).emit(`onNewMessage-${data.room}`, data);
    });

    socket.on("emitRemoveMessage", (data: IMessage): void => {
      this._io.compress(true).emit(`onRemoveMessage-${data.room}`, data);
    });
  }

  /**
   * listen socket disconnect
   * @param socket - socket connected
   * @param user - user connected
   */
  private _socketOnDisconnect(socket: Socket, user: IUserRoom) {
    socket.on("disconnect", async () => {
      SocketRooms.removeUser(user);
      this._io.compress(true).emit(`userDisconnected-${user.room}`, user);
    });
  }

  /**
   * events socket emit
   * @param user - user connected
   */
  private _socketEmit(user: IUserRoom) {
    this._io.compress(true).emit(`userConnected-${user.room}`, user);

    const usersRoom: IUserRoom[] = SocketRooms.getUsersRoom(user);
    this._io.compress(true).emit(`userConnected-${user.userId}`, usersRoom);
  }
}
