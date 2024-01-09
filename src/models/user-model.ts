import { Schema, model } from "mongoose";
import IUser from "../interfaces/user-interface";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: String,
    lat: Number,
    long: Number,
    firebaseToken: String,
    isOnline: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
