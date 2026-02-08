import userRoute from "../routes/user.route";
import { Router } from "express";
import authRoute from "../routes/auth.route";
import departmentRoute from "../routes/department.route";

const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/department", departmentRoute);
export default router;
