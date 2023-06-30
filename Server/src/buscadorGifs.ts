import { LowdbSync } from "lowdb";
import { DatabaseSchemaGif } from "./DatabaseSchema";

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
