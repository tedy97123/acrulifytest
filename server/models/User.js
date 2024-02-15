import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        // oauthId: {
        //     type: String,
        //     unique: true,
        // },
        // accessToken: {
        //     type: String,
        // },
        // refreshToken: {
        //     type: String,
        // },
        firstName: {
            type: String,
              required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        totalTimeWorked: {
            type:Number,
              required: true,
        },
        email: {
            type: String,
              required: true,
        },
        password: {
            type: String,
              required: true,
        }, 
        descriptionIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Descriptions",
            },
        ],
        lineItemIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "LineItem",
            },
        ],
    },
    { timestamps: true },{ toJSON: { getters: true } }
);

const User = mongoose.model("User", UserSchema);
export default User;
