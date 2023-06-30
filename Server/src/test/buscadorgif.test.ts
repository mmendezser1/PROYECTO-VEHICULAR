import { buscadorGifs, orderGifs } from "../routes";
import { DatabaseSchemaGif } from "../DatabaseSchema";
import Memory from "lowdb/adapters/Memory";
import lowdb from "lowdb";
import dbData from "../../data/fixtures/dbSearcher.json";
import { createApp } from "../app";
import { Express } from "express";
import { LowdbSync } from "lowdb";
import { gifBuilder } from "./builders/gifBuilder";

describe("Testing search gif function", () => {
  let db: LowdbSync<DatabaseSchemaGif>;

  beforeEach(() => {
    let app: Express;
    const adapter = new Memory<DatabaseSchemaGif>("");
    db = lowdb(adapter);
    db.defaults(dbData).write();
    app = createApp(db);
  });
  it("Test searching by word MOODMAN", () => {
    let buildGif = gifBuilder()
      .withTitle("Movie Brazil GIF by MOODMAN")
      .build();
    const arrayGifs = { gifs: [buildGif] };

    db.set("gifs", [buildGif]).write();

    const result = buscadorGifs("MOODMAN", db);
    expect(result).toHaveLength(1);
  });
});
