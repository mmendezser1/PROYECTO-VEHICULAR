import express from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";

export const createRoutes = (db: LowdbSync<DatabaseSchemaGif>) => {
  var routes = express.Router();

  routes.get("/gifs", function (req, res) {
    const gifs = db.get("gifs").take(50).value();
    res.json({
      response: gifs.map((myGif) => {
        return {
          name: myGif.title,
          src: myGif.images.small.url,
          numberOfLikes: 5,
        };
      }),
    });
  });
  return routes;
};
