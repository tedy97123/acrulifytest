import express from "express";
import User from "../models/User.js";
import LineItem from "../models/lineItem.js";

const router = express.Router();

router.get("/getAllUsers", async(req,res) => {
  try{
    const users = await User.find();
    res.status(201).json(users)
  } catch (error){
    res.status(400).json({ message: error.message });
  }
});

 
router.post("/create_users", async (req, res) => {
  try {
    console.log(req.body)
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 
export default router;
