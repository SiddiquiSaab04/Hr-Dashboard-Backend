import { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";
import { Prisma } from "@prisma/client";

export const AttendanceController = {
    createAttendance: async (req: Request, res: Response) => {
        const attendanceData = req.body;
        const attendance = await AttendanceService.createAttendance(attendanceData as Prisma.AttendanceCreateInput);
        res.status(201).json(attendance);
    },
    getAllAttendance: async (req: Request, res: Response) => {
        const attendance = await AttendanceService.getAllAttendance();
        res.status(200).json(attendance);
    },
    getAttendanceByUserId: async (req: Request, res: Response) => {
        const userId = req.params.userId;
        try {
            const attendance = await AttendanceService.getAttendanceByUserId(Number(userId));
            res.status(200).json(attendance);
        } catch (error) {
             res.status(404).json({ error: "user not found" });
        }
    }
}