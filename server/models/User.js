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
            value: mongoose.Schema.Types.String,
        },
        lastName: {
            value: mongoose.Schema.Types.String,
        },
        totalTimeWorked: {
            value:mongoose.Schema.Types.Number,
        },
        email: {
            value: mongoose.Schema.Types.String,
        },
        password: {
            value: mongoose.Schema.Types.String,
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
