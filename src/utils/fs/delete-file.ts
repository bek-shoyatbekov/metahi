import fs from "fs/promises";
import { logger } from "../log/logger";

async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath);
    logger.info(`File ${filePath} has been deleted.`);
  } catch (err: any) {
    // An error occurred while deleting the file
    if (err.code === "ENOENT") {
      // The file does not exist
      logger.error("The file does not exist");
    } else {
      // Some other error
      logger.error(err.message);
    }
  }
}

export default deleteFile;
