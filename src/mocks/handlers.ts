import { rest } from "msw";
import Gif from "../Models/Gif";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
    console.log("Entro a getGifts");
    const gifChris = new Gif("/images/chris.gif", "gif chris", 3);
    const gifRubik = new Gif("/images/rubik_cube.gif", "gif rubik", 2);
    const gifHomer = new Gif("/images/homer.gif", "gif homer", 1);

    return res(ctx.status(200), ctx.json([gifHomer, gifRubik, gifChris]));
  }),
];
