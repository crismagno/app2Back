import { Socket } from "socket.io";
import { Log } from "../../helpers/Log";
import { IMessage } from "../../models/Message/types";

const redis = require("socket.io-redis");
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

  start() {
    Log.show("Starting socket...", "SOCKET_SOCIAL", "success");
    try {
      this.io.adapter(
        redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
      );
      Log.show("Starting socket redis...", "SOCKET_SOCIAL", "success");

      this.io.on("connection", (socket: Socket) => {
        Log.show(
          `User connected - SOCKET_ID: [ ${socket.id} ]`,
          "SOCKET_SOCIAL",
          "warn"
        );
        this.socketOn(socket);
      });
      Log.show("Socket started...", "SOCKET_SOCIAL", "success");
    } catch (error) {
      Log.show(
        `Error socket start ${String(error)}`,
        "SOCKET_SOCIAL",
        "success"
      );
    }
  }

  private socketOn(socket: Socket) {
    socket.on("emitNewMessage", (data: IMessage): void => {
      this.io.emit("onNewMessage", data);
    });

    socket.on("emitRemoveMessage", (data: IMessage): void => {
      this.io.emit("onRemoveMessage", data);
    });
  }
}
