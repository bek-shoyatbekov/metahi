import { Router } from "express";
import { login } from "../controllers/login";
import upload from "../utils/multer/upload";
import { logout } from "../controllers/logout";
import { getAllGreetings } from "../controllers/greet";
import {
  getUserOnlineStatus,
  turnOnOrOffUserOnlineStatus,
} from "../controllers/control-onlining";

const router = Router();

//____________ Auth routes ___________

router.post("/login", upload, login);

router.get("/logout", logout);

//____________ Greet routes ___________

router.get("/greetings", getAllGreetings);

//____________ User status routes ___________

router.put("/user-status", turnOnOrOffUserOnlineStatus);

router.get("/user-status", getUserOnlineStatus);

export default router;
