import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

export default router;

// router
//   .route("/userid")
//   .get(getUserDetails)
//   .put(updateUserDetails)
//   .delete(deleteUserDetails);

// same result

// router.get("/userid", getUserDetails);

// router.put("/userid", updateUserDetails);

// router.delete("/userid", deleteUserDetails);

// router.delete("/userid/:id", deleteUserDetails); via params const { id } = req.params; id-65143fa72a7e4e9f2cf1d19c,
//  url - /userid/65143fa72a7e4e9f2cf1d19c
