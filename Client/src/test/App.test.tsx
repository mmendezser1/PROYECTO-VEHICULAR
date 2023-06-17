import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";
import { Gif } from "../Models/Gif";

it("Check that exist one gif", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      // TODO Entender la inicialización de este test
      const gifRubik: Gif = {
        src: "/images/rubik_cube.gif",
        alt: "cube_rubik_gif",
      };
      return res(ctx.json([gifRubik]));
    })
  );

  render(<App />);

  const cuboRubik = await screen.findByAltText("cube_rubik_gif");
  expect(cuboRubik).toBeVisible();
});

it("Check that not exist any gif", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  render(<App />);

  const cuboRubik = await screen.findByText("No hay ningún gif disponible...");
  expect(cuboRubik).toBeVisible();
});
/*
it("Check the gifs list is ordered", async () => {
  render(<App />);

  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
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
      return res(ctx.json([gifHomer, gifChris, gifRubik]));
    })
  );

  const arrayGifs = await screen.findAllByTestId("gif");

  const chrisGif = await screen.findByAltText("gif chris");
  const rubikGif = await screen.findByAltText("gif rubik");
  const homerGif = await screen.findByAltText("gif homer");

  expect(arrayGifs[0]).toEqual(chrisGif);
  expect(arrayGifs[1]).toEqual(rubikGif);
  expect(arrayGifs[2]).toEqual(homerGif);
});
*/
