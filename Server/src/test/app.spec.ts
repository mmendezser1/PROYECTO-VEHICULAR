import request from "supertest";
import { createApp } from "../app";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { DatabaseSchemaGif } from "../DatabaseSchema";
import { GifDTO } from "../GifDTO";

const adapter = new FileSync<DatabaseSchemaGif>("./data/db.json");
const db = low(adapter);

const app = createApp(db);

describe("GET /api/gifs", function () {
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
