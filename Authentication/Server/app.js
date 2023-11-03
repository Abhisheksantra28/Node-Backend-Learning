import { configDotenv } from "dotenv";
import express from "express";
import { connectPassport } from "./routes/utils/Provider.js";
import session from "express-session";
import passport from "passport";

const app = express();
export default app;
configDotenv({
  path: "./config/config.env",
});

//using middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

// Importing Routes
import userRoute from "./routes/user.js";
app.use("/api/v1", userRoute);
