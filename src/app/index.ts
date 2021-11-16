import { SocketSocial } from "../utils/SocketSocial";
import express from "express";
import http from "http";

export class App {
  private app = express();
  private PORT = process.env.PORT;
  private server = http.createServer(this.app);
  constructor() {}

  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    new SocketSocial(this.server).start();

    this.server.listen(this.PORT, () => {
      console.log(`Listening on port ${this.PORT}`);
      console.log(`http://localhost:${this.PORT}`);
    });
  }

}
