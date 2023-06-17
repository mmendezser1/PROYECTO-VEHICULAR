import express from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";
import { GifDTO } from "./GifDTO";

export const createRoutes = (db: LowdbSync<DatabaseSchemaGif>) => {
  var routes = express.Router();

  routes.get("/gifs", function (req, res) {
    const gifs = db.get("gifs").take(20).value();

    res.json({
      response: gifs.map((myGif, key) => {
        return {
          name: myGif.title,
          src: myGif.images.small.url,
          numberOfLikes: (key += 5),
        };
      }),
    });
  });
  return routes;
};

export const orderGifs = (myGifs: Array<GifDTO>) => {
  myGifs.sort((gif1, gif2) => {
    if (gif1.numberOfLikes > gif2.numberOfLikes) return -1;
    if (gif1.numberOfLikes < gif2.numberOfLikes) return 1;
    return 0;
  });
  return myGifs;
};
