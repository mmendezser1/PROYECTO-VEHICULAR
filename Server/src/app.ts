import express, { Express, NextFunction, Request, Response } from "express";
import { LowdbSync } from "lowdb";
import { createRoutes } from "./routes";
import morgan from "morgan";

export const createApp = (db: LowdbSync<DatabaseSchema>) => {
  const app: Express = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", createRoutes(db));
  return app;
};
