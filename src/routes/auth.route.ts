import { Router } from "express";
import {LoginController, LogoutController} from "../controllers/auth.controller";
import authMiddleware from "../middilewares/auth";
const router = Router();


router.post("/login",LoginController);
router.post("/logout",authMiddleware,LogoutController);
export default router;