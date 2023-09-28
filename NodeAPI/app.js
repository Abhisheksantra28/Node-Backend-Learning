import express from "express";
import UserRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./data/config.env",
});

//add middlewares
app.use(express.json());
app.use("/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});
