import { User } from "../models/user.js";

export const getAllUser = async (req, res) => {
  const users = await User.find({});
  // console.log(req.query);

  res.json({
    success: true,
    users,
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
