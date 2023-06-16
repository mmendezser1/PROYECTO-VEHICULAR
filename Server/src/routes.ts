import express from "express";
import { LowdbSync } from "lowdb";

export const createRoutes = (db: LowdbSync<DatabaseSchema>) => {
  var routes = express.Router();

  routes.get("/gifs", function (req, res) {
    // const gifs = db.get("gifs").take(50).value();
    const gifs = db.get("gifs").take(50).value();

    res.json({ response: gifs });
  });
  return routes;
};
