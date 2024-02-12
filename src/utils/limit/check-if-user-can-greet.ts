import Greeting from "../../models/greeting-model";
import { logger } from "../log/logger";

export const checkIfUserCanGreet = async (from: string, to: string) => {
  try {
    const greeting = await Greeting.findOne({ from, to });
    if (!greeting) {
      return true;
    }
    const now = new Date();
    const lastGreeting = new Date(greeting.createdAt);
    const diff = now.getTime() - lastGreeting.getTime();
    const diffHours = diff / (1000 * 60);
    // If more than 1 minutes have passed since the last greeting, allow a new one
    return diffHours > 1;
  } catch (err) {
    logger.error(err);
  }
};
