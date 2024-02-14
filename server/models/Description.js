import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DescriptionSchema = new Schema(
  {
    role: String,
    workDescription: String,
    mood:String, 
     userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Description = mongoose.model("Description", DescriptionSchema);
export default Description;
