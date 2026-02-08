import { Request , Response } from "express";
import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";
export class AttendanceService {
    static async createAttendance(attendanceData: Prisma.AttendanceCreateInput) {
      const attendance = await prisma.attendance.create({
        data: attendanceData,
      });
      return attendance;
    }
}