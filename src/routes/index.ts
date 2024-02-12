import { Router } from "express";
import { login } from "../controllers/login";
import upload from "../utils/multer/upload";
import { logout } from "../controllers/logout";
import { getAllGreetings } from "../controllers/greet";
import {
  getUserOnlineStatus,
  turnOnOrOffUserOnlineStatus,
} from "../controllers/control-onlining";
import editProfile from "../controllers/edit-profile";
import { identifyCommonUserContacts } from "../controllers/relatives/identify-common-contacts";

const router = Router();

//____________ Auth routes ___________

router.post("/login", upload, login);

router.get("/logout", logout);

router.put("/edit-profile", upload, editProfile);

//____________ Greet routes ___________

router.get("/greetings", getAllGreetings);

// ____________ Get user contacts routes ___________

router.post("/set-contacts", identifyCommonUserContacts);

//____________ User status routes ___________

router.put("/user-status", turnOnOrOffUserOnlineStatus);

router.get("/user-status", getUserOnlineStatus);

export default router;
