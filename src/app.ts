import http from "http";
import express, { Express } from "express";
import session from "express-session";
import path from "node:path";
import socketIO from "socket.io";

import config from "./config/index";
import { connectDB } from "./utils/database/connectDB";
import { logRequest } from "./utils/log/log-request";
import userRouter from "./routes/index";
import { SocketIOService } from "./services/socket.io";

const app: Express = express();

// Connecting MongoDB
(async () => {
  await connectDB();
})();

app.use(express.json({ limit: "2M" }));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
app.use(express.static(path.join("./public")));

app.use(logRequest);
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
  return;
});

app.use("/api/v1", userRouter);

const server = http.createServer(app);

const PORT = config.port;

const io: socketIO.Server = new socketIO.Server(server);



io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.listen(PORT, "localhost", () => console.log(`Listening on ${PORT}`));
// const socketIoService = new SocketIOService(io);
