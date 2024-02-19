import express from "express";
import Description from "../models/Description.js";
import User from "../models/User.js";
import LineItem from "../models/lineItem.js";
const router = express.Router();
  
router.get("/descriptions", async (req, res) => {
  try {
    const descriptions = await Description.find();
    res.status(200).json(descriptions);
  } catch (error) {
    console.error("Error fetching descriptions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/descriptions/:id", async (req, res) => {
  const {id} = req.params
  console.log(id)
  try {
    const descriptions = await Description.findById(id);
    res.status(200).json(descriptions);
  } catch (error) {
    console.error("Error fetching descriptions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
router.post("/updateDescription", async (req, res) => {
  try {
    const { lineItemId, descriptionText } = req.body;

    const newDescription = new Description({ workDescription: descriptionText });
    const savedDescription = await newDescription.save();

    const newDescriptionId = savedDescription._id;

    const updatedLineItem = await LineItem.findByIdAndUpdate(
      lineItemId, 
      { $push: { descriptionIds: newDescriptionId } },  
      { new: true }
    );
    
    res.status(201).json({ updatedLineItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 
export default router;
