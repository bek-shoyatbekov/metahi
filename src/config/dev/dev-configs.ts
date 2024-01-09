import { config } from "dotenv";
import path from "node:path";
import IConfig from "../../interfaces/config-interface";

config({ path: path.resolve(process.cwd(), ".env.local") });

export default {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI || "mongodb://localhost:27017",
} as IConfig;
