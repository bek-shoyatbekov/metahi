import { Schema, model } from "mongoose";
import { IRelatives } from "../interfaces/relatives";

const relativesSchema = new Schema<IRelatives>(
  {
    userId: String,
    contacts: [String],
    relatives: [String],
  },
  {
    timestamps: true,
  }
);

export default model<IRelatives>("Relatives", relativesSchema);
