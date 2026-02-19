import { Request, Response } from "express";
import {LeaveService} from "../services/leave.service";

const requestLeave = async (req: Request, res: Response) => {
    const userId = (req as any)?.user.id;
    const leaveData = req.body;
    const leaveRequest = await LeaveService.requestLeave(userId, leaveData as any);
    res.status(200).json(leaveRequest);
};

const getAllLeaves = async (req: Request, res: Response) => {
    const leaveRequests = await LeaveService.getAllLeaves();
    res.status(200).json(leaveRequests);
}

const getLeaveById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const leaveRequest = await LeaveService.getLeaveById(id);
    res.status(200).json(leaveRequest);
}

export {
    requestLeave,
    getAllLeaves,
    getLeaveById
}