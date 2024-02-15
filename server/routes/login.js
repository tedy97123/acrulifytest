import express from "express";
import User from "../models/User.js";

const router = express.Router(); 

router.post("/Login", async (req, res) => {
   const { email, password } = req.body; 
  try {
    const user = await User.find({'email':email  , 'password':password});
    if ( !user || []  ) {
      return res.status(404).json({ message: "User not found" });
    }  
     res.status(200).json({message: "User Logged In"}) 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
