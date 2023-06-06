import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";
import Gif from "../Models/Gif";
import { log } from "console";

it("Check that exist one gif", async () => {
  render(<App />);
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
      let gif = new Gif("/images/rubik_cube.gif", "cube_rubik_gif");

      return res(ctx.json([gif]));
    })
  );

  const cuboRubik = await screen.findByAltText("cube_rubik_gif");
  expect(cuboRubik).toBeVisible();
});

it("Check that not exist any gif", async () => {
  render(<App />);
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  const cuboRubik = await screen.findByText("No hay ningún gif disponible...");
  expect(cuboRubik).toBeVisible();
});

it("Check the gifs list is ordered", async () => {
  render(<App />);
  const gifChris = new Gif("/images/chris.gif", "gif chris", 3);
  const gifRubik = new Gif("/images/rubik_cube.gif", "gif rubik", 2);
  const gifHomer = new Gif("/images/homer.gif", "gif homer", 1);

  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
      return res(ctx.json([gifHomer, gifChris, gifRubik]));
    })
  );

  const arrayGifs = await screen.findAllByTestId("gif");
  const chrisGif = await screen.findByAltText("gif chris");

  expect(arrayGifs[0]).toEqual(chrisGif);
});
