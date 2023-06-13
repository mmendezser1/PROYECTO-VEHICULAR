import express from "express";
import { LowdbSync } from "lowdb";

export const createRoutes = (db: LowdbSync<DatabaseSchema>) => {
  var routes = express.Router();

  routes.get("/memes", function (req, res) {
    const memes = db.get("memes").take(50).value();
    res.json({ response: memes });
  });
  return routes;
};
