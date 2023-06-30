import request from "supertest";
import { createApp } from "../app";
import { Express } from "express";
import low from "lowdb";
import lowdb from "lowdb";
import Memory from "lowdb/adapters/Memory";
import FileSync from "lowdb/adapters/FileSync";
import { DatabaseSchemaGif } from "../DatabaseSchema";
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
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  it("Search is valid, has more than 5 characters", function (done) {
    const apiContent = { gif: "Palabra buscada" };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .expect("Content-Type", /json/)
      .then((res) => {
        const response = res.body.response;
        expect(Array.isArray(response)).toBe(true);
        done();
      });
  });

  it("Search is NO valid, has less than 5 characters", function (done) {
    const apiContent = { gif: "lol" };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  it("Search is NO valid, has special caracters", function (done) {
    const apiContent = { gif: "ª^%?¿º" };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  it("Search found Gifs, searching in lowercase", function (done) {
    const apiContent = { gif: "perros juagando a futbol " };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .expect("Content-Type", /json/)
      .then((res) => {
        const response = res.body.response;
        expect(Array.isArray(response)).toBe(true);
        done();
      });
  });

  it("Search found Gifs, searching in lowercase and upper case", function (done) {
    const apiContent = { gif: "PeRrItOs " };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .expect("Content-Type", /json/)
      .then((res) => {
        const response = res.body.response;
        expect(Array.isArray(response)).toBe(true);
        done();
      });
  });

  it("Search found Gifs, searching upper case", function (done) {
    const apiContent = { gif: "PERRITOS ROJOS " };
    request(app)
      .post("/api/gifs/find")
      .set("Accept", "application/json")
      .send(apiContent)
      .expect("Content-Type", /json/)
      .then((res) => {
        const response = res.body.response;
        expect(Array.isArray(response)).toBe(true);
        done();
      });
  });
});
