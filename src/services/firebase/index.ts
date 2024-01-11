import firebase from "firebase-admin";
import { readFile } from "../../utils/fs/read-file";

const serviceAccount = readFile("./firebase-config.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as string),
});

export default firebase;
