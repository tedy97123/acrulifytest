import express from "express";
import LineItem from "../models/lineItem.js"; 
import User from "../models/User.js";
import { parse } from "dotenv";
const router = express.Router();

router.get("/getLineItem", async (req, res) => {
  try {
    const lineItem = await LineItem.find()
    res.status(200).json(lineItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

 
router.get("/findLineItem/:id", async (req, res) => {
  try {
  const {id} = req.params
  const lineItem = await LineItem.findById(id) 
  res.status(200).json(lineItem); 
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/createLineItem',async(req,res) => {  
  try{
    const {id  ,rate ,date,startTime} = req.body
    console.log(rate)
    const user = await User.findById(id) 
    if(user){   
      await LineItem.insertMany([{
      'rate':rate,
      'date':date,
      'userIds':id,
      'startTime':startTime,
      }]);
     const newLineItem = await LineItem.find({'userIds':id});
     const filter = {'_id':id}
     const update = {"lineItemIds":newLineItem }
     const doc = await User.findByIdAndUpdate(filter, update, {
      new: true,
      upsert: false  
    });      
    const sortedLineItems = await LineItem.find({ 'userIds': id }).sort({ 'createdAt': -1 });
    user.lineItemIds = sortedLineItems.map(item => item._id);
    await user.save();
    res.status(201).json(doc); 
  }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/updateStartTime',async(req,res) => {  
  try{
    const { lineItemId,  startTime , userId  } = req.body
     const user = await User.findById(userId) 
    if(user){     
      const filter = {'_id':lineItemId}
      const update = {"startTime":startTime }
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
router.post("/totalHours", async (req, res) => {
  try {
  const {lineItemId , userId} = req.body
  const lineItem = await LineItem.findById({'_id':lineItemId})
  const user = await User.findOne({'_id': userId}); 
  function calculateTimeDifference(startTime, endTime) {
  const currentDate = new Date().toDateString();
  const startDateTime = new Date(`${currentDate} ${startTime}`);
  const endDateTime = new Date(`${currentDate} ${endTime}`);
  const differenceInMilliseconds = endDateTime - startDateTime;
  let seconds = Math.floor((differenceInMilliseconds / 1000) % 60);
  let minutes = Math.floor((differenceInMilliseconds / 1000 / 60) % 60);
  let hours = Math.floor(differenceInMilliseconds / 1000 / 3600);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const totalTimeWorked = hours + "h:" + minutes + "m:" + seconds + "s";
  console.log(totalTimeWorked);
  return totalTimeWorked;
}

  let T = calculateTimeDifference(lineItem.startTime,lineItem.stopTime)
  const filter = {'_id':lineItemId}
  const update = {"totalTimeWorked":T }
   const doc = await LineItem.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false  
    });       
      await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/updateStopTime', async (req, res) => {  
  try {
    const { lineItemId, stopTime, userId,rate,startTime } = req.body;
    console.log(req.body)
    const user = await User.findOne({'_id': userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
   function calculateEarnings(startTime, stopTime, rateOfPay) {
    const currentDate = new Date().toDateString();
    const startDateTime = new Date(`${currentDate} ${startTime}`);
    const endDateTime = new Date(`${currentDate} ${stopTime}`);
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        console.error('Invalid start or stop time');
        return NaN;
    }
    const millisecondsPerHour = 1000 * 60 * 60;
    const hoursWorked = (endDateTime - startDateTime) / millisecondsPerHour;
    const rateP = parseFloat(rateOfPay);
    if (isNaN(rateP)) {
        console.error('Invalid rate of pay');
        return NaN;
    }
    const earnings = hoursWorked * rateP;
    return earnings;
}
    const E = calculateEarnings(startTime,stopTime,rate);
     const updatedLineItem = await LineItem.findOneAndUpdate(
      { '_id': lineItemId }, 
      { 
      'stopTime': stopTime , 
      'totalEarnings':E.toFixed(2)
    },
      { new: true, upsert: false }
    );

    const sortedLineItems = await LineItem.find({ 'userIds': userId })
      .sort({ 'createdAt': -1 })
    user.lineItemIds =  sortedLineItems.map(item => item._id);
    await user.save(); 
    res.status(201).json(updatedLineItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




router.get('/findLineItemsByUserId/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the userId is a valid ObjectId
    if (!userId){
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find line items associated with this user
    const lineItems = await LineItem.find({ userIds: userId });
    res.status(200).json(lineItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;
