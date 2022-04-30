import { Express, Request, Response } from "express";
import { Log } from "../../helpers/Log";
import { EModules, LogColorsStatus } from "../../helpers/Log/types";
export class Main {
  constructor(private app: Express) {}
  public start(): void {
    try {
      this.app.get("/", (req: Request, res: Response): Response => {
        return res.status(200).send("Welcome...");
      });
    } catch (error) {
      Log.show("Error at start Main...", EModules.MAIN, LogColorsStatus.ERROR);
    }
  }
}
