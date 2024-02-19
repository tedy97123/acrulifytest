import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DescriptionSchema = new Schema(
  {
    workDescription: String,
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
