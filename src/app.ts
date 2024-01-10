import http from "http";
import express, { Express } from "express";
import session from "express-session";
import path from "node:path";

import config from "./config/index";
import { connectDB } from "./utils/database/connectDB";
import { logRequest } from "./utils/log/log-request";
import userRouter from "./routes/index";

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
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
