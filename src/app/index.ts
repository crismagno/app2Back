import { SocketSocial } from "../utils/SocketSocial";
import express, { Express } from "express";
import http from "http";
import { MiddleWares } from "../middlewares";
import { ServerCluster } from "../utils/ServerCluster";
import { Routes } from "../routes";

export class App {
  private _app: Express = express();
  
  private _port: number = Number(process.env.PORT);
  
  private _server: http.Server = http.createServer(this._app);

  public start(): void {
    new MiddleWares(this._app).start();
    
    new SocketSocial(this._server).start();
    
    new ServerCluster(this._server, this._port).start();
    
    new Routes(this._app).start();
  }
}
