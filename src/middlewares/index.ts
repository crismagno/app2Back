import express, { Express } from "express";

export class MiddleWares {
  constructor(private app: Express) {}
  public start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
