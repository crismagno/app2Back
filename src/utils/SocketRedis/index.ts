import { Log } from "../../helpers/Log";
import { EModules, LogColorsStatus } from "../../helpers/Log/types";
const redis = require("socket.io-redis");

export class SocketRedis {
  constructor(private _io: any) {}

  public start(): void {
    if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
      try {
        this._io.adapter(
          redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
        );

        Log.show(
          "Starting socket redis...",
          EModules.SOCKET_SOCIAL,
          LogColorsStatus.SUCCESS
        );
      } catch (error) {
        Log.show(
          "Error socket redis...",
          EModules.SOCKET_SOCIAL,
          LogColorsStatus.ERROR
        );
      }
    }
  }
}
