import { Express } from "express";
import { Log } from "../helpers/Log";
import { EModules, LogColorsStatus } from "../helpers/Log/types";
import { Main } from "./Main";
export class Routes {
  constructor(private app: Express) {}
  public start(): void {
    try {
      new Main(this.app).start();
    } catch (error) {
      Log.show(
        "Error at start Routes...",
        EModules.ROUTES,
        LogColorsStatus.ERROR
      );
    }
  }
}
