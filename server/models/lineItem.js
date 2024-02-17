import mongoose from "mongoose";

const Schema = mongoose.Schema;
 
const LineItemSchema = new Schema(
  {
    date: {
      type: String,
    },
      startTime: {
        type: String,
        default: null, // Or set a default date if required
      },
      stopTime: {
        type: String,
        default: null, // Or set a default date if required
      },
      rate:{
        type: Number,
        deafault: null,
      },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const LineItem = mongoose.model("LineItem", LineItemSchema);
export default LineItem;
