import firebase from "./index";
import IMessage from "../../interfaces/notification-interface";
import { logger } from "../../utils/log/logger";

export const sendNotification = async (message: IMessage) => {
  try {
    const response = await firebase.messaging().send(message);
    if (!response) throw new Error("Failed to send notification");
    logger.info("Notification sent successfully");
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

// ! Test example

const testToken = ``;

(async () => {
  const message: IMessage = {
    notification: {
      title: "Test",
      body: "Something",
    },
    token: testToken,
  };
  // Send Notification
  await sendNotification(message);
})();
