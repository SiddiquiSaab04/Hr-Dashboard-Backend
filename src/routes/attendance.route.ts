import express from "express";
import { AttendanceController } from "../controllers/attendance.controller";
const router = express.Router();

router.post("/create-attendance", AttendanceController.createAttendance);

export default router;
