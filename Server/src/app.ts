import express, { Express, NextFunction, Request, Response } from "express";
import { LowdbSync } from "lowdb";
import { createRoutes } from "./routes";
import morgan from "morgan";
import { DatabaseSchemaGif } from "./DatabaseSchema";

export const createApp = (db: LowdbSync<DatabaseSchemaGif>) => {
  const app: Express = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", createRoutes(db));
  return app;
};
