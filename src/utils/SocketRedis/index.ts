import { Log } from "../../helpers/Log";
const redis = require("socket.io-redis");

export class SocketRedis {
  public static start(io: any) {
    if (process.env.NODE_ENV === "dev") {
      try {
        io.adapter(
          redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
        );
        Log.show("Starting socket redis...", "SOCKET_SOCIAL", "success");
      } catch (error) {
        Log.show("Error socket redis...", "SOCKET_SOCIAL", "error");
      }
    }
  }
}
