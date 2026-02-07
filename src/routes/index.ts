import userRoute from "../routes/user.route";
import { Router } from "express";
import authRoute from "../routes/auth.route";

const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
export default router;
