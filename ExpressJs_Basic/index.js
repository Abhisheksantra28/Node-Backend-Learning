import express from "express";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "./env.js";

// Access environment variables
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl, {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//collection
const User = mongoose.model("User", userSchema);

const app = express();

// using middwares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Setting up view engine
app.set("view engine", "ejs");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decoded = jwt.verify(token, "bhsqgqhavdb");
    // console.log(decoded);
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

// add dummy data to the database
/*
app.get("/add", async (req, res) => {
  await Message.create({
    name: "Abhishek2",
    email: "Sample2@gmail.com",
  });
  res.send("Massage added to the database");
});

*/

/*

app.get("/", isAuthenticated, (req, res) => {
  // res.send("Hi")
  // res.sendStatus(404);
  //   res.json({
  //     success: true,
  //     products: [],
  //   });

  // res.render("index", { name: "Abhishek" });

  // console.log(req.cookies.token);

  res.render("logout");

  //   res.sendFile("index.html");
});

*/

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { name: req.user.name });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) return res.redirect("/register");

  // const isMatch = user.password === password;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.render("login", { email, message: "Incorrect Password" });

  const token = jwt.sign({ _id: user._id }, "bhsqgqhavdb");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

// Authentication
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "bhsqgqhavdb");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});
app.get("/logout", (req, res) => {
  res.cookie("token", "null", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

//express basic & mongoDB
// app.get("/success", (req, res) => {
//   res.render("success");
// });
/*
app.post("/contact", async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.name);

  const { name, email } = req.body;
  await Message.create({ name: name, email: email });
  // as key value pair is same
  await Message.create({ name, email });

  // const messageData = { name: req.body.name, email: req.body.email };
  // await Message.create(messageData);
  res.redirect("./success");
});
*/

// app.get("/users", (req, res) => {
//   res.json({
//     users,
//   });
// });

app.get("/products", (req, res) => {
  const pathlocation = path.resolve();
  res.sendFile(path.join(pathlocation, "./index.html"));
});

app.listen(port, () => {
  console.log(`Server is Working on PORT ${port}`);
});
