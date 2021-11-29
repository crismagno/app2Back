import { Socket } from "socket.io";
import { Log } from "../../helpers/Log";
import { IMessage } from "../../models/Message/types";
import { SocketRedis } from "../SocketRedis";
import { SocketRooms } from "../SocketRooms";
import { UserRoom } from "../UserRoom";
import { IUserRoom } from "../UserRoom/types";

const socket = require("socket.io");

export class SocketSocial {
  private io: any;

  constructor(private server) {
    this.io = socket(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  public start() {
    Log.show("Starting socket...", "SOCKET_SOCIAL", "none");
    try {
      SocketRedis.start(this.io);
      this.io.on("connection", (socket: Socket) => {
        const user = new UserRoom(
          String(socket.handshake.query.userId),
          String(socket.handshake.query.username),
          String(socket.handshake.query.room),
          socket.id,
          String(socket.handshake.query.avatar || "")
        );
        SocketRooms.setUser(user);
        this.socketEmit(user);
        this.socketOn(socket);
        this.socketOnDisconnect(socket, user);
      });
    } catch (error) {
      Log.show(
        `Error socket start ${String(error)}`,
        "SOCKET_SOCIAL",
        "success"
      );
    }
  }
  /**
   * listen socket on
   * @param socket - socket connected
   */
  private socketOn(socket: Socket) {
    socket.on("emitNewMessage", (data: IMessage): void => {
      this.io.compress(true).emit(`onNewMessage-${data.room}`, data);
    });

    socket.on("emitRemoveMessage", (data: IMessage): void => {
      this.io.compress(true).emit(`onRemoveMessage-${data.room}`, data);
    });
  }

  /**
   * listen socket disconnect
   * @param socket - socket connected
   * @param user - user connected
   */
  private socketOnDisconnect(socket: Socket, user: IUserRoom) {
    socket.on("disconnect", async () => {
      SocketRooms.removeUser(user);
      this.io.compress(true).emit(`userDisconnected-${user.room}`, user);
    });
  }

  /**
   * events socket emit
   * @param user - user connected
   */
  private socketEmit(user: IUserRoom) {
    this.io.compress(true).emit(`userConnected-${user.room}`, user);
  }
}
