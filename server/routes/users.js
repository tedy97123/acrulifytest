import express from "express";
import passport from 'passport';
 import User from "../models/User.js";
const router = express.Router();


router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// search users by Id
router.patch("/users/:id", async (req, res) => {
  // req from client
  const { id } = req.params;
  // res from server to client
  const { firstName, lastName, email, credentials } = req.body;

  try {
    // search db for user with id from req from client
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // truthys to validate 
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    // validation check uses `passport` from okta
    if (credentials && credentials.password) {
      user.credentials.password = credentials.password;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
