import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";

test("renders learn react link", () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon?limit=15", (req, res, ctx) => {
      return res(ctx.json({ gif: "/images/rubik_cube.gif" }));
    })
  );

  render(<App />);
  const linkElement = screen.getByText("cube_rubik_gif");
  expect(linkElement).toBeInTheDocument();
});
