import { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";
import { createAttendanceValidationSchema } from "../validators/attendance.validation";
import { Prisma } from "@prisma/client";
export class AttendanceController {
    static async createAttendance(req: Request, res: Response) {
        const attendanceData = req.body;
        const attendance = await AttendanceService.createAttendance(attendanceData as Prisma.AttendanceCreateInput);
        res.status(201).json(attendance);
    }
}