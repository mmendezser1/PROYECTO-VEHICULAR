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

  routes.post("/gifs/find", function (req, res) {
    const nombreGif = req.body.gif;
    const nombreGifToValidate = nombreGif.replaceAll(" ", "");

    const STRING_LENGTH_REQUIREMENT = nombreGifToValidate.length <= 4;
    const STIRNG_HAS_SPECIAL_CHARACTER =
      hasSpecialCharacter(nombreGifToValidate);

    if (STRING_LENGTH_REQUIREMENT || STIRNG_HAS_SPECIAL_CHARACTER) {
      res.json({ response: "string NO valido" });
    }

    nombreGif;
    // Buscart tal cual
    // Dividir y buscar por palabras
    // gatos que bailan breackdance
    // Gatos
    // bailan
    // breakdance

    res.json({ response: "string valido" });
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

const hasSpecialCharacter = (text: String) => {
  const characterCorrected = text.replace(/[^a-zA-Z0-9]/g, "");
  console.log(text + " -- " + characterCorrected);
  return characterCorrected === text ? false : true;
};
