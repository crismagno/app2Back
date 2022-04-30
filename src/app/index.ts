import { SocketSocial } from "../utils/SocketSocial";
import express, { Express } from "express";
import http from "http";
import { MiddleWares } from "../middlewares";
import { ServerCluster } from "../utils/ServerCluster";
import { Routes } from "../routes";
import { Log } from "../helpers/Log";
import { EModules, LogColorsStatus } from "../helpers/Log/types";

export class App {
  private app: Express = express();
  private port: number = Number(process.env.PORT);
  private server: http.Server = http.createServer(this.app);

  public start(): void {
    try {
      new MiddleWares(this.app).start();
      new SocketSocial(this.server).start();
      new ServerCluster(this.server, this.port).start();
      new Routes(this.app).start();
    } catch (error) {
      Log.show("Error start App", EModules.APP, LogColorsStatus.ERROR);
    }
  }
}
