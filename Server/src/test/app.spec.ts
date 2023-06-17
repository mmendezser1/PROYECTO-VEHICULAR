import request from "supertest";
import { createApp } from "../app";
import { Express } from "express";
import low from "lowdb";
import lowdb from "lowdb";
import Memory from "lowdb/adapters/Memory";
import FileSync from "lowdb/adapters/FileSync";
import { DatabaseSchemaGif } from "../DatabaseSchema";
import { GifDTO } from "../GifDTO";
import dbData from "../../data/db.json";

const adapter = new FileSync<DatabaseSchemaGif>("./data/db.json");
const db = low(adapter);

describe("GET /api/gifs", function () {
  let app: Express;
  beforeEach(() => {
    const adapter = new Memory<DatabaseSchemaGif>("");
    const db = lowdb(adapter);
    db.defaults(dbData).write();
    app = createApp(db);
  });
  it("responds with code 200", function (done) {
    request(app)
      .get("/api/gifs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("Return gif with my spected structure", function (done) {
    const expectedFirstGif: GifDTO = {
      name: "Movie Brazil GIF by MOODMAN",
      src: "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif",
      numberOfLikes: 5,
    };
    request(app)
      .get("/api/gifs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const firstGif = res.body.response[0];
        expect(firstGif).toEqual(expectedFirstGif);
        done();
      });
  });

  it("Check my api returns 20 gifs", function (done) {
    request(app)
      .get("/api/gifs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const myGifs = res.body.response;
        expect(myGifs).toHaveLength(20);
        done();
      });
  });
});
