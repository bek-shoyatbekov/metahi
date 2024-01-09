import fs from "fs";
import { logger } from "../log/logger";

export const readFile = (path: string) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (err) {
    logger.error(err);
  }
};
