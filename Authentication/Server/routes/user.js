import express from "express";
import passport from "passport";
import { myProfile } from "../controllers/user.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/login", passport.authenticate("google"), (req, res,next) => {
  res.send("Logged In");
});

router.get("/me", myProfile);

export default router;
