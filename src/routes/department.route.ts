import { Router } from "express";
import { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } from "../controllers/department.controller";
import authMiddleware from "../middilewares/auth";
import { requireAdminRole, requireAdminOrHRRole } from "../middilewares/role";

const router = Router();

router.use(authMiddleware);

router.post("/create-dept", requireAdminOrHRRole, createDepartment);
router.get("/get-depts", getAllDepartments); 
router.get("/get-dept/:id", getDepartmentById);
router.patch("/update-dept/:id", requireAdminOrHRRole, updateDepartment);
router.delete("/delete-dept/:id", requireAdminOrHRRole, deleteDepartment); 

export default router;
