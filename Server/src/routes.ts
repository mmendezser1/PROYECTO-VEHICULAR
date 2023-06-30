import express from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";
import { buscadorGifs } from "./buscadorGifs";
import { mapGifsToGifDTO } from "./mapGifsToGifDTO";
import { hasSpecialCharacter } from "./hasSpecialCharacter";

export const createRoutes = (db: LowdbSync<DatabaseSchemaGif>) => {
  var routes = express.Router();

  routes.get("/gifs", function (req, res) {
    const gifs = db.get("gifs").take(20).value();

    res.json({
      response: mapGifsToGifDTO(gifs),
    });
  });

  routes.post("/gifs/find", function (req, res) {
    const nombreGif = req.body.gif;

    const nombreGifToValidate = nombreGif.replaceAll(" ", "");

    const STRING_LENGTH_REQUIREMENT = nombreGifToValidate.length <= 4;
    const STIRNG_HAS_SPECIAL_CHARACTER =
      hasSpecialCharacter(nombreGifToValidate);

    if (STRING_LENGTH_REQUIREMENT || STIRNG_HAS_SPECIAL_CHARACTER) {
      res.status(400);
      res.json({
        error_message:
          "String no válido para búsqueda. No debe contener caracteres especiales y más de 4 caracteres",
      });
    }

    let gifsBuscados = buscadorGifs(nombreGif, db);

    res.json({ response: mapGifsToGifDTO(gifsBuscados) });
  });

  return routes;
};
