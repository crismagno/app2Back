import { SocketSocial } from "../utils/SocketSocial";
import express, { Express } from "express";
import http from "http";
import { MiddleWares } from "../middlewares/indes";

export class App {
  private app: Express = express();
  private PORT = process.env.PORT;
  private server = http.createServer(this.app);

  public start(): void {
    new MiddleWares(this.app).start();
    new SocketSocial(this.server).start();

    this.server.listen(this.PORT, () => {
      console.log(`Listening on port ${this.PORT}`);
      console.log(`http://localhost:${this.PORT}`);
    });
  }
}
