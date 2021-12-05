import { Express, Request, Response } from "express";
export class Main {
  constructor(private app: Express) {}
  public start() {
    this.app.get("/", (req: Request, res: Response): Response => {
      return res.status(200).send("Welcome...");
    });
  }
}
