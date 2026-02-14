import { Request, Response } from "express";
import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";
export class AttendanceService {

  static async checkIn(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId: userId,
        date: today,
      },
    });
    if (existingAttendance) {
      throw new Error("User has already checked in today");
    }
    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: today,
        status: "PRESENT",
        checkIn: new Date(),
      },
    });
    return { ...attendance };
  }

  static async getAllAttendance() {
    const attendance = await prisma.attendance.findMany(
      {
        include: {
          user: {
            select: {
              name: true,
              id: true,
              dept: {
                select: {
                  deptName: true,
                },
              },
            },
          },
      }
    })
    return attendance.map((a) => ({
      id: a.id,
      userId: a?.user?.id || "No id",
      userName: a?.user?.name || "No name",
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      deptName: a?.user?.dept?.deptName || "No department",
      status: a.status,
      date: a.date,
    }));
  }

  static async getAttendanceByUserId(userId: number) {
    const attendance = await prisma.attendance.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            dept: {
              select: {
                deptName: true,
              },
            },
          },
        },
      },
    });
    if (!attendance) {
      throw new Error("Attendance not found");
    }
    return attendance.map((a) => ({
      id: a.id,
      userName: a?.user?.name || "No name",
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      deptName: a?.user?.dept?.deptName || "No department",
      status: a.status,
      date: a.date,
    }));
  }

  static async getAttendanceById(id: number) {
    const attendance = await prisma.attendance.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new Error("Attendance not found");
    }
    return attendance;
  }

  static async updateAttendance(
    id: number,
    attendanceData: Prisma.AttendanceUpdateInput,
  ) {
    const attendance = await prisma.attendance.update({
      where: { id },
      data: attendanceData,
    });
    if (!attendance) {
      throw new Error("Attendance not found");
    }
    return attendance;
  }

  static async deleteAttendance(id: number) {
    await prisma.attendance.delete({
      where: { id },
    });
  }
}
