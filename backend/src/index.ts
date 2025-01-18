import express from "express";
import { WebSocketServer } from "ws";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import cookieSession from "cookie-session";

dotenv.config();

import "./config/passportConfig";
import { connectToDatabase } from "./db/db";
import authRouter from "./routes/auth.route";
import errorHandler from "./middlewares/errorHandler.middleware";
import ServerManager from "./managers/serverManager";

const PORT = process.env.PORT || 8000;

cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

const app = express();

app.use(
  cookieSession({
    keys: [process.env.COOKIE_SECRET!],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

//https://github.com/jaredhanson/passport/issues/904#issuecomment-1307558283
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Welcome");
});
app.use("/api/auth", authRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  connectToDatabase();
  console.log(`http://localhost:${PORT}`);
});

const wss = ServerManager.getServer(server);

wss.on("connection", (socket) => {
  console.log("New connection");
});
