import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import { log } from "node:console";

export class LeaveService {

    static async requestLeave(userId: number, leaveData: Prisma.LeaveCreateInput) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            const startDate = new Date(leaveData?.startDate ?? new Date());
            const endDate = new Date(leaveData?.endDate ?? new Date());
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate < today || endDate < today) {
                throw new Error("Start and end dates must be greater than or equal to today's date");
            }
            if (startDate > endDate) {
                throw new Error("Start date must be less than or equal to end date");
            }
            const diffTime = endDate.getTime() - startDate.getTime();
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            if (user) {
                const leaves = await prisma.leave.create({
                    data: {
                        userId,
                        type: leaveData.type,
                        status: leaveData?.status || "PENDING",
                        days: days,
                        reason: leaveData?.reason || "No reason provided",
                        startDate: startDate,
                        endDate: endDate,
                    }
                })
                return leaves;
            }
            else {
                throw new Error("User not found");
            }
        } catch (error) {
            throw new Error("Error requesting leave: " + error);
        }
    }

   static async getAllLeaves() {
    try {
      const leaveRequests = await prisma.leave.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              deptId: true,
            },
          },
        },
      });
      return leaveRequests;
    } catch (error) {
      throw new Error("Error fetching leave requests: " + error);
    }
  }
  static async getLeaveById(id : number) {
    try {
      const leaveRequest = await prisma.leave.findUnique({
        where: { id:id as number }
      });
      console.log(leaveRequest);
      return leaveRequest;
    } catch (error) {
      throw new Error("Error fetching leave request: " + error);
    }
  }

  static async getLeaveByUserId(userId : number) {
    try {
      const leaveRequests = await prisma.leave.findMany({
        where: { userId }
      });
      return leaveRequests;
    } catch (error) {
      throw new Error("Error fetching leave requests: " + error);
    }
  }

}
