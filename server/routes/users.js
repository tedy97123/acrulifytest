import express from "express";
import User from "../models/User.js";

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

// search users by Id
router.get("/getUser", async (req, res) => {
  // req from client
  const { id } = req.body;
  // res from server to client
   const { email, password } = req.body; 
  try {
    // search db for user with id from req from client
    const user = await User.find({'email':email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // truthys to validate 
      if (email) user.email = email;
      if (password) {
        user.password = password;
      }
    // const updatedUser = await user.save();
     res.status(200).json({message:"User Logged In!"});
    res.status(200).json(user);    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
