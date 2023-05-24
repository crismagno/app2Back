import express, { Express } from "express";

export class MiddleWares {
  constructor(private _app: Express) {}
  
  public start() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }
}
