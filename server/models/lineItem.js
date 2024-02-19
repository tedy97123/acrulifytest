import mongoose from "mongoose";

const Schema = mongoose.Schema;
 
const LineItemSchema = new Schema(
  {
    date: {
      type: Number,
    },
      startTime: {
        type: String,
        default: null, // Or set a default date if required
      },
      stopTime: {
        type: String,
        default: null, // Or set a default date if required
      },
      totalTimeWorked: {
        type:String,
      },
      rate:{
        type: String,
      },
      totalEarnings:{
       type: String, 
      },
    descriptionIds: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Description",
            },
          ],
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
