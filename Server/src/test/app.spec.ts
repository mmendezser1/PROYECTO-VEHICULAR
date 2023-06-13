import request from "supertest";
import { createApp } from "../app";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync<DatabaseSchema>("./data/db.json");
const db = low(adapter);

const app = createApp(db);

describe("GET /api/memes", function () {
  it("responds with code 200", function (done) {
    request(app)
      .get("/api/memes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
