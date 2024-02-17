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

 
router.get("/findLineItem/:id", async (req, res) => {
  try {
  const {id} = req.params
  console.log(id)
  const lineItem = await LineItem.findById(id) 
  res.status(200).json(lineItem); 
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/createLineItem',async(req,res) => {  
  try{
    const {firstName , startTime ,rate ,date} = req.body
    const user = await User.findOne({'firstName' : firstName}) 
    if(user){   
     const creationLineItem =  await LineItem.create({'startTime':startTime},{'rate':rate},{'date':date},{'userIds':user._id});
     creationLineItem
     const newLineItem = await LineItem.find({'userIds':user._id});
     const filter = {'_id':user._id}
     const update = {"lineItemIds":newLineItem }
     const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false  
    });  
     res.status(201).json(doc);
  }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/updateStartTime',async(req,res) => {  
  try{
    const { lineItemId,  startTime , firstName  } = req.body
    const user = await User.findOne({'firstName' : firstName}) 
    if(user){    
     const filter = {'_id':lineItemId}
     const update = {"startTime":startTime}
      const doc = await LineItem.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false  
    });
    doc._id;
    doc.startTime
      res.status(201).json(doc);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 
router.patch('/updateStopTime',async(req,res) => {  
  try{
    const { lineItemId,  stopTime , firstName  } = req.body
    const user = await User.findOne({'firstName' : firstName}) 
     //create line item and update usermodel with lineItem Id
    if(user){    
     const filter = {'_id':lineItemId}
     const update = {"stopTime":stopTime}
      const doc = await LineItem.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false  
    });
      res.status(201).json(doc);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/findLineItem/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email)
    const user = await User.findOne({ 'email': email });
    console.log(user)
    if (user) {
      const lineItems = await LineItem.find({ '_id':  user.lineItemIds } );
      res.status(200).json(lineItems); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
