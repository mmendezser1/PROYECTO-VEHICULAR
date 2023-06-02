import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";

test("renders learn react link", async () => {
  render(<App />);
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
      return res(
        ctx.json([{ src: "/images/rubik_cube.gif", alt: "cube_rubik_gif" }])
      );
    })
  );

  const cuboRubik = await screen.findByAltText("cube_rubik_gif");
  expect(cuboRubik).toBeVisible();
});
