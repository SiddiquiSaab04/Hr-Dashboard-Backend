import { Request, Response } from "express";
import {LeaveService} from "../services/leave.service";

const requestLeave = async (req: Request, res: Response) => {
    const userId = (req as any)?.user.id;
    const leaveData = req.body;
    const leaveRequest = await LeaveService.requestLeave(userId, leaveData as any);
    res.status(200).json(leaveRequest);
};


export {
    requestLeave
}