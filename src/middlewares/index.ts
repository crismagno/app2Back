import express, { Express } from "express";
import { Log } from "../helpers/Log";
import { EModules, LogColorsStatus } from "../helpers/Log/types";

export class MiddleWares {
  constructor(private app: Express) {}
  public start(): void {
    try {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
    } catch (error) {
      Log.show(
        "Error start Middlewares",
        EModules.MIDDLEWARES,
        LogColorsStatus.ERROR
      );
    }
  }
}
