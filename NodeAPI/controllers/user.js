import { User } from "../models/user.js";
import bcrypt, { compare } from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("user already exists ", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, 201, "Registered Successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password ", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid  Password ", 400));

    sendCookie(user, res, 200, `Welcome Back, ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Devolpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Devolpoment" ? false : true,
      })
      .json({
        success: true,
        message: "Logged out successfully",
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

/*

export const getAllUser = async (req, res) => {
  const users = await User.find({});
  // console.log(req.query);

  res.json({
    success: true,
    users,
  });
};

export const updateUserDetails = async (req, res) => {
  const { id } = req.query;

  const users = await User.findById(id);

  res.json({
    success: true,
    message: "User Details Updated",
  });
};

export const deleteUserDetails = async (req, res) => {
  const { id } = req.query;

  const user = await User.findById(id);

  await user.deleteOne();

  res.json({
    success: true,
    message: "User deleted successfully",
  });
};

export const getUserDetails = async (req, res) => {
  const { id } = req.query;
  const users = await User.findById(id);

  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp", "iamcookie").json({
    success: true,
    message: "Registered Successfully",
  });
};

*/
