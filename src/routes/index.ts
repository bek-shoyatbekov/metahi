import { Router } from "express";
import { login } from "../controllers/login";
import upload from "../utils/multer/upload";
import { logout } from "../controllers/logout";
import { getAllGreetings } from "../controllers/greet";
import { turnOnOrOffUserOnlineStatus } from "../controllers/control-onlining";


const router = Router();

//____________ Auth routes ___________

router.post("/login", upload, login);

router.post("/logout", logout);

//____________ Greet routes ___________

router.get("/greetings", getAllGreetings);

//____________ User status routes ___________

router.put("/user-status", turnOnOrOffUserOnlineStatus);

export default router;
