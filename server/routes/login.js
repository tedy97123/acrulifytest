import express, { response } from "express";
import User from "../models/User.js";

const router = express.Router(); 

router.post("/Login", async (req, res) => {
   const { email, password } = req.body; 
  try {
   let user = await User.findOne({'email':email  , 'password':password}); 
   if(!user){
       res.status(404).json({ message: "User not found" })
   }else {
         const returnedUserObject = {
         "firstName": user.firstName,
         "lastName": user.lastName,
         "totalTimeWorked": user.totalTimeWorked,
         "email": user.email,
         "descriptionIds": user.descriptionIds,
         "lineItemIds": user.lineItemIds,
      };
      res.status(200).json({message: "User Logged In", curentUser:returnedUserObject}) 
   }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
