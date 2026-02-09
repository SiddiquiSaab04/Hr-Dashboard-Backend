import { Request, Response } from "express";
import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";
export class AttendanceService {
  static async createAttendance(attendanceData: Prisma.AttendanceCreateInput) {
    const attendance = await prisma.attendance.create({
      data: attendanceData,
    });
    return attendance;
  }

  static async getAllAttendance() {
    const attendance = await prisma.attendance.findMany();
    return attendance;
  }

  static async getAttendanceByUserId(userId: number) {
    const attendance = await prisma.attendance.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            dept: {
              select: {
                deptName: true,
              }
            },
          }
        },
      }
    });
    if (!attendance) {
      throw new Error("Attendance not found");
    }
    return attendance.map(a => ({
      id: a.id,
      date: a.date,
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      status: a.status,
      deptName: a?.user?.dept?.deptName || "No department",
    }));
  }
}