import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";

export class LeaveService {

    static async requestLeave(userId: number, leaveData: Prisma.LeaveCreateInput) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (user) {
                const leaves = await prisma.leave.create({
                    data: {
                        userId,
                        type: leaveData.type,
                        status: leaveData?.status || "PENDING",
                        days: leaveData?.days || 1,
                        reason: leaveData?.reason || "No reason provided",
                        startDate: leaveData?.startDate || new Date(),
                        endDate: leaveData?.endDate || new Date(),
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



}
