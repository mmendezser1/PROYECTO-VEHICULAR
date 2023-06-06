import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";
import Gif from "../Models/Gif";

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
