import { SocketSocial } from "../utils/SocketSocial";
import express, { Express } from "express";
import http from "http";
import { MiddleWares } from "../middlewares/indes";
import { Log } from "../helpers/Log";

export class App {
  private app: Express = express();
  private PORT = process.env.PORT;
  private server = http.createServer(this.app);

  public start(): void {
    new MiddleWares(this.app).start();
    new SocketSocial(this.server).start();

    this.server.listen(this.PORT, () => {
      Log.show(
        `Listening on port ${this.PORT}, http://localhost:${this.PORT}`,
        "APP",
        "info"
      );
    });
  }
}
