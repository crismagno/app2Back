import { Socket } from "socket.io";
import { IMessage } from "../models/Message/types";

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
    console.log("Starting socket...");
    try {
      this.io.adapter(
        redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
        );
        console.log("Starting socket redis...");
        
        this.io.on("connection", (socket: Socket) => {
          console.log(`User connected - SOCKET_ID: [ ${socket.id} ]`);
          this.socketOn(socket);
        });
        console.log("Socket started...");
    } catch (error) {
      console.log("Error socket start", error);
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
