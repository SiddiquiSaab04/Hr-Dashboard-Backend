import { Request , Response } from "express";
import {DepartmentService} from "../services/department.service";

export const createDepartment = async (req:Request , res:Response) =>{
    try {
        const {deptName} = req.body;
        if (!deptName) {
            return res.status(400).send({message: "Department name is required"});
        }
        const department = await DepartmentService.createDepartment(deptName);
        res.status(201).send(department);
    } catch (error:any) {
        res.status(500).send({message: error.message});
    }
}

export const getAllDepartments = async (req:Request , res:Response) =>{
    try {
        const departments = await DepartmentService.getAllDepartments();
        res.status(200).send(departments);
    } catch (error:any) {
        res.status(500).send({message: error.message});
    }
}

export const getDepartmentById = async (req:Request , res:Response) =>{
    try {
        const id = Number(req.params.id);
        const department = await DepartmentService.getDepartmentById(id);
        res.status(200).send(department);
    } catch (error:any) {
        if (error.message === "Department not found") {
             return res.status(404).send({message: error.message});
        }
        res.status(500).send({message: error.message});
    }
}

export const updateDepartment = async (req:Request , res:Response) =>{
    try {
        const id = Number(req.params.id);
        const {deptName} = req.body;
        if (!deptName) {
            return res.status(400).send({message: "Department name is required"});
        }
        const department = await DepartmentService.updateDepartment(id, deptName);
        res.status(200).send(department);
    } catch (error:any) {
        if (error.message === "Department not found") {
             return res.status(404).send({message: error.message});
        }
        res.status(500).send({message: error.message});
    }
}

export const deleteDepartment = async (req:Request , res:Response) =>{
    try {
        const id = Number(req.params.id);
        const result = await DepartmentService.deleteDepartment(id);
        res.status(200).send(result);
    } catch (error:any) {
        if (error.message === "Department not found") {
             return res.status(404).send({message: error.message});
        }
        res.status(500).send({message: error.message});
    }
}
