import userRoute from "../routes/user.route";
import { Router } from "express";
import authRoute from "../routes/auth.route";
import departmentRoute from "../routes/department.route";
import attendanceRoute from "../routes/attendance.route";
import leaveRoute from "../routes/leave.route";
const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/department", departmentRoute);
router.use("/attendance", attendanceRoute);
router.use("/leave", leaveRoute);
export default router;
