import express from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";

export const createRoutes = (db: LowdbSync<DatabaseSchemaGif>) => {
  var routes = express.Router();

  routes.get("/gifs", function (req, res) {
    const gifs = db.get("gifs").take(50).value();
    //funcion mapeo
    res.json({ response: gifs });
  });
  return routes;
};
