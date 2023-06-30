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
  it("Test searching by word and get many results", () => {
    const buildGifShrek1 = gifBuilder().withTitle("Shrek 1").build();
    const buildGifShrek2 = gifBuilder().withTitle("Shrek 2").build();
    const buildGifShrek3 = gifBuilder().withTitle("Shrek 3").build();
    const arrayShrekGifs = [buildGifShrek1, buildGifShrek2, buildGifShrek3];
    db.set("gifs", arrayShrekGifs).write();
    const result = buscadorGifs("shrek", db);
    expect(result).toHaveLength(3);
  });
});
