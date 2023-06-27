import { rest } from "msw";
import { Gif } from "../Models/Gif";

export const handlers = [
  rest.get("http://localhost:3005/api/gifs", (req, res, ctx) => {
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
    let arrayGifs = [
      gifHomer,
      gifRubik,
      gifChris,
      gifHomer,
      gifChris,
      gifHomer,
      gifChris,
      gifHomer,
      gifHomer,
      gifChris,
      gifHomer,
    ];
    return res(ctx.status(200), ctx.json(arrayGifs));
  }),
];
