import express from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";
import { GifDTO } from "./GifDTO";

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
      res.send(
        "String no válido para búsqueda. No debe contener caracteres especiales y más de 4 caracteres"
      );
    }

    let gifsBuscados = buscadorGifs(nombreGif, db);

    res.json({ response: mapGifsToGifDTO(gifsBuscados) });
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

  return characterCorrected === text ? false : true;
};

export const buscadorGifs = (
  nombreGif: String,
  db: LowdbSync<DatabaseSchemaGif>
) => {
  console.log("PALABRA A BUSCAR: ", nombreGif);
  const palabrasGif = nombreGif.split(" ");
  let gifsEncontrados: Gif[] = [];
  const primeraBusqueda = db
    .get("gifs")
    .value()
    .filter((myGif) => {
      return myGif.title.toLowerCase().includes(nombreGif.toLowerCase());
    });

  gifsEncontrados = gifsEncontrados.concat(primeraBusqueda);

  palabrasGif.forEach((palabraABuscar) => {
    if (palabraABuscar.length >= 3) {
      gifsEncontrados.concat(
        db
          .get("gifs")
          .value()
          .filter((myGif) => {
            return myGif.title
              .toLocaleLowerCase()
              .includes(palabraABuscar.toLocaleLowerCase());
          })
      );
    }
  });
  return gifsEncontrados;
};

const mapGifsToGifDTO = (myGifs: Array<Gif>) => {
  return myGifs.map((myGif, key) => {
    return {
      name: myGif.title,
      src: myGif.images.small.url,
      numberOfLikes: (key += 5),
    };
  });
};
