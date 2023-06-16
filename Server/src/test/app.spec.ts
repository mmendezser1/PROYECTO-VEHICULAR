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
    request(app)
      .get("/api/gifs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        console.log(res.body.response[0]);
        //expect(res.body.response).toBeInstanceOf<GifDTO>(Array);
        done();
      });
  });
});
