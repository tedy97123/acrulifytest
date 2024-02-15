import express from "express";
import User from "../models/User.js";

const router = express.Router(); 

router.post("/Login", async (req, res) => {
   const { email, password } = req.body; 
  try {
    let user = await User.find({'email':email  , 'password':password}); 
    user != [] ? res.status(200).json({message: "User Logged In"}) :res.status(404).json({ message: "User not found" }) ;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
