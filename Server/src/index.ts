import FileSync from "lowdb/adapters/FileSync";
import { createApp } from "./app";
import http, { Server } from "http";
import low from "lowdb";
import Memory from "lowdb/adapters/Memory";

const adapter = new FileSync<DatabaseSchema>("./data/db.json");
const db = low(adapter);

const app = createApp(db);

export const server: Server = http.createServer(app);

const port: string = process.env.PORT || "3005";

app.set("port", port);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

interface ListeningError extends Error {
  syscall?: string;
  code?: string;
}

function onError(error: ListeningError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${port} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Listening on ${port}`);
}
