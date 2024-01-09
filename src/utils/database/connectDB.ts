import mongoose from "mongoose";
import config from "../../config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};
