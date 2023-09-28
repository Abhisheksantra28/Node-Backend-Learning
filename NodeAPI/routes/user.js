import express from "express";
import {
  deleteUserDetails,
  getAllUser,
  getUserDetails,
  register,
  updateUserDetails,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUser);

router
  .route("/userid")
  .get(getUserDetails)
  .put(updateUserDetails)
  .delete(deleteUserDetails);

    // same result

// router.get("/userid", getUserDetails);

// router.put("/userid", updateUserDetails);

// router.delete("/userid", deleteUserDetails);

// router.delete("/userid/:id", deleteUserDetails); via params const { id } = req.params; id-65143fa72a7e4e9f2cf1d19c,
//  url - /userid/65143fa72a7e4e9f2cf1d19c

router.post("/new", register);

export default router;
