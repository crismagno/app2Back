import { SocketSocial } from "../utils/SocketSocial";
import express, { Express } from "express";
import http from "http";
import { MiddleWares } from "../middlewares";
import { ServerCluster } from "../utils/ServerCluster";
import { Routes } from "../routes";
import { Log } from "../helpers/Log";
import { EModules, LogColorsStatus } from "../helpers/Log/types";

export class App {
  private _app: Express = express();

  private _port: number = Number(process.env.PORT);

  private _server: http.Server = http.createServer(this._app);

  public start(): void {
    try {
      new MiddleWares(this._app).start();

      new SocketSocial(this._server).start();

      new ServerCluster(this._server, this._port).start();

      new Routes(this._app).start();
    } catch (error) {
      Log.show("Error start App", EModules.APP, LogColorsStatus.ERROR);
    }
  }
}
