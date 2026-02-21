import { Request, Response } from "express";
import {LeaveService} from "../services/leave.service";
import { LeaveStatus } from "@prisma/client";

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
    console.log("id",id);
    
    if(id !== undefined){
    const leaveRequest = await LeaveService.getLeaveById(id);
        res.status(200).json(leaveRequest);

    }
}

const getLeaveByUserId = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    // console.log("Fetching leaves for user ID:", userId);
    const leaveRequests = await LeaveService.getLeaveByUserId(userId);
    res.status(200).json(leaveRequests);
}

const updateLeaveStatus = async(req:Request , res:Response ) => {
    const userId = Number(req.params.id);
    const status = req.body.status as LeaveStatus;
     if(userId !== undefined){
    const updateStatus = await LeaveService.updateLeaveStatus(userId,status);
        res.status(200).json(updateStatus);
    }else{
        res.status(400).json({message:"user id is required"});
    }
}



export {
    requestLeave,
    getAllLeaves,
    getLeaveById,
    getLeaveByUserId,
    updateLeaveStatus,
}