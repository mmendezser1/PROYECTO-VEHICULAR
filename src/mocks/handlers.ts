// src/mocks/handlers.js
import { rest } from "msw";
import Gif from "../Models/Gif";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
    console.log("Entro a getGifts");
    let gifs = new Gif("/images/chris.gif", "chris_gif");

    return res(ctx.status(200), ctx.json([gifs]));
  }),
];
