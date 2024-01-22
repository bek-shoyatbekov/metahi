import firebase, { ServiceAccount } from "firebase-admin";
import { logger } from "../../utils/log/logger";

import serviceAccount from "../../../firebase-config.json";
logger.info(serviceAccount);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as ServiceAccount),
});

export default firebase;
