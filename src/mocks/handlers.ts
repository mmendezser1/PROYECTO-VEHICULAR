// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
    console.log("Entro a getGifts");
    return res(
      ctx.status(200),
      ctx.json({
        src: "/images/chris.gif",
        alt: "chris_gif",
      })
    );
  }),
];
