import { DatabaseSchemaGif } from "../DatabaseSchema";
import Memory from "lowdb/adapters/Memory";
import lowdb from "lowdb";
import dbData from "../../data/fixtures/dbSearcher.json";
import { createApp } from "../app";
import { Express } from "express";
import { LowdbSync } from "lowdb";
import { gifBuilder } from "./builders/gifBuilder";
import { buscadorGifs } from "../buscadorGifs";

describe("Testing search gif function", () => {
  let db: LowdbSync<DatabaseSchemaGif>;

  beforeEach(() => {
    let app: Express;
    const adapter = new Memory<DatabaseSchemaGif>("");
    db = lowdb(adapter);
    db.defaults(dbData).write();
    app = createApp(db);
  });
  it("Test searching by word MOODMAN with expected response", () => {
    let buildGif = gifBuilder()
      .withTitle("Movie Brazil GIF by MOODMAN")
      .build();

    const arrayGifs = [buildGif];
    db.set("gifs", arrayGifs).write();

    const result = buscadorGifs("MOODMAN", db);
    expect(result).toHaveLength(1);
  });

  it("Test searching by word MOODMAN with lowerCase", () => {
    const buildGif = gifBuilder()
      .withTitle("Movie Brazil GIF by MOODMAN")
      .build();
    const arrayGifs = [buildGif];
    db.set("gifs", arrayGifs).write();
    const result = buscadorGifs("moodman", db);
    expect(result).toHaveLength(1);
  });

  it("Test searching by word and not expected results", () => {
    const buildGif = gifBuilder()
      .withTitle("Movie Brazil Gif by MOODMAN")
      .build();
    const arrayGifs = [buildGif];
    db.set("gifs", arrayGifs).write();
    const result = buscadorGifs("sdsadsda", db);

    expect(result).toHaveLength(0);
  });
});
