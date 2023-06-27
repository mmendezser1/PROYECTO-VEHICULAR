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

  it("Check my Api returns String no valid in void string", function (done) {
    const apiContent = { gif: "" };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .expect("Content-Type", /json/)
      .then((res) => {
        const response = res.body.response;
        expect(response).toBe("string NO valido");
        done();
      });
  });
});
