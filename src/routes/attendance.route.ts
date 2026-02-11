import express from "express";
import { AttendanceController } from "../controllers/attendance.controller";
import authMiddleware from "../middilewares/auth";
import { requireAdminOrHRRole , requireAny } from "../middilewares/role";
const router = express.Router();
router.use(authMiddleware);
router.post("/check-in", requireAny, AttendanceController.checkIn);
router.get("/get-all-attendance", requireAny, AttendanceController.getAllAttendance);
router.get("/get-attendance/:userId", requireAny, AttendanceController.getAttendanceByUserId);
router.get("/get-attendanceById/:id", requireAny, AttendanceController.getAttendanceById);
router.put("/update-attendance/:id",requireAny, AttendanceController.updateAttendance);
router.delete("/delete-attendance/:id", requireAdminOrHRRole, AttendanceController.deleteAttendance);

export default router;  
