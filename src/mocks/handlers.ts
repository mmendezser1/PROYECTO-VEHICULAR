// src/mocks/handlers.js
import { rest } from "msw";
import cubeGift from "./..svg";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
    console.log("Entro a getGifts");
    return res(
      ctx.status(200),
      ctx.json({
        gif: "/images/rubik_cube.gif",
      })
    );
  }),
];
