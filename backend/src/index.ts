import express from "express";
import dotenv from "dotenv";

import { connectToDatabase, pool } from "./db/db";

dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  res.send("Welcome");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`http://localhost:${PORT}`);
});
