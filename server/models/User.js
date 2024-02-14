import mongoose from "mongoose";

const Schema = mongoose.Schema; 
 
const UserSchema = new Schema(
  {
      firstName: {
      value:mongoose.Schema.Types.String 
      },

      lastName: {
      value:mongoose.Schema.Types.String 
      },

      email: {
      value:mongoose.Schema.Types.String 
      },

      credentials: {
      password: {
      value:mongoose.Schema.Types.String 
      },
      
      }, 
  }, 
  { timestamps: true } , { toJSON: { getters: true } }
);

const User = mongoose.model("User", UserSchema);
export default User;