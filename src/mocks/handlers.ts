import { rest } from "msw";
import { Gif } from "../Models/Gif";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
    console.log("Entro a getGifts");
    const gifChris: Gif = {
      src: "/images/chris.gif",
      alt: "gif chris",
      numberOfLikes: 3,
    };
    const gifRubik: Gif = {
      src: "/images/rubik_cube.gif",
      alt: "gif rubik",
      numberOfLikes: 2,
    };
    const gifHomer: Gif = {
      src: "/images/homer.gif",
      alt: "gif homer",
      numberOfLikes: 1,
    };

    return res(ctx.status(200), ctx.json([gifHomer, gifRubik, gifChris]));
  }),
];
