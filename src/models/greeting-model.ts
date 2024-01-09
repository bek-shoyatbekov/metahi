import { Schema, model } from "mongoose";
import IGreeting from "../interfaces/greeting-interface";

const userSchema = new Schema<IGreeting>(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IGreeting>("Greeting", userSchema);
