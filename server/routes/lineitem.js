import express from "express";
import LineItem from "../models/lineItem.js"; 
import User from "../models/User.js";
const router = express.Router();

router.get("/getLineItem", async (req, res) => {
  try {
    const lineItem = await LineItem.find()
      .limit(50)
      .sort({ createdOn: -1 });
    res.status(200).json(lineItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/postLineItem',async(req,res) => {  
  try{
    const {firstName , email , startTime , rate} = req.body
    console.log(firstName , email , new Date(startTime) , rate)
    const user = await User.findOne({'firstName' : firstName})
    if(user){
      const newLineItem = new LineItem({
        'date': new Date(startTime),
        'rate': rate,
        'startTime': new Date(startTime),
        'userIds': user.id
      })
      const savedLineItem = newLineItem.save();
      console.log(savedLineItem)
     res.status(201).json(savedLineItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// router.patch('/updateLineItem',async(req,res) => {  
//   try{
//     const {firstName , email , startTime , rate} = req.body
//     console.log(firstName , email , new Date(startTime) , rate)
//     const user = await User.findOne({'firstName' : firstName})
//     if(user){
//       const newLineItem = new LineItem({
//         'date': new Date(startTime),
//         'rate': rate,
//         'startTime': new Date(startTime),
//         'userIds': user.id
//       })
//       const savedLineItem = newLineItem.save();
//       console.log(savedLineItem)
//      res.status(201).json(savedLineItem);
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.get('/findLineItem/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ 'email': email });
    if (user) {
      const lineItemPerUser = await LineItem.find({ 'userIds': user.id });
      res.status(200).json(lineItemPerUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
