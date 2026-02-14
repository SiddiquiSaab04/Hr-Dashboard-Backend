import { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";
import { Prisma } from "@prisma/client";

export const AttendanceController = {
    
    checkIn : async (req: Request, res: Response) =>{
        const userId = req.body.userId;
        await AttendanceService.checkIn(userId);
        res.status(201).json({ message: "Checked in successfully" });
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
    },

    getAttendanceById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            const attendance = await AttendanceService.getAttendanceById(id);
            res.status(200).json(attendance);
        } catch (error) {
            res.status(404).json({ error: "attendance not found" });
        }
    },

    updateAttendance: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const attendanceData = req.body;
        try {
            const attendance = await AttendanceService.updateAttendance(id, attendanceData);
            res.status(200).json(attendance);
        } catch (error: any) {
            console.error("Error updating attendance:", error);
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Attendance record not found" });
            }
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
    },

    deleteAttendance: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            await AttendanceService.deleteAttendance(id);
            res.status(204).send("Attendance deleted successfully");
        } catch (error: any) {
            console.error("Error deleting attendance:", error);
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Attendance record not found" });
            }
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
    }

}