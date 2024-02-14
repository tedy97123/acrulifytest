import express from "express";
import Description from "../models/Description.js";
 
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
 

export default router;
