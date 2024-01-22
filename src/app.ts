import http from "http";
import express, { Express } from "express";
import session from "express-session";
import path from "node:path";
import { Server } from "socket.io";
import morgan from "morgan";

import config from "./config/index";
import { connectDB } from "./utils/database/connectDB";
import userRouter from "./routes/index";
import { SocketIOService } from "./services/socket.io";

const app: Express = express();

// Connecting MongoDB
(async () => {
  await connectDB();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("./public")));

const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Hello World");
  return;
});

app.use("/api/v1", userRouter);

const server = http.createServer(app);

const io = new Server(server);

const PORT = config.port;

const socketIoService = new SocketIOService();

socketIoService.init(io);

socketIoService.run();

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
