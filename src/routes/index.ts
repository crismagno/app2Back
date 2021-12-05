import { Express } from "express";
import { Main } from "./Main";
export class Routes {
  constructor(private app: Express) {}
  public start() {
    new Main(this.app).start();
  }
}
