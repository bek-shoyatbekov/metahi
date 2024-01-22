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

const testToken = `fOGBy-U_TUyvgv5Yjzbo4L:APA91bGtP-v3YqX93mwUgQ6V914jd9EqxEjAAq6QRzxq_2xynORPoanbcKmpK6Jpn1a5uTFljWqiimIxPqQrjMyHVYAOSZYAhYu2cqf8jKfWrvN641gdBSIqCf_pwNTs4qVUOphNIZvl`;

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
