import express from "express";
import LineItem from "../models/lineItem";
const router = express.Router();

router.get("/lineItem", async (req, res) => {
  try {
    const lineItem = await LineItem.find()
      .limit(50)
      .sort({ createdOn: -1 });
    res.status(200).json(lineItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
