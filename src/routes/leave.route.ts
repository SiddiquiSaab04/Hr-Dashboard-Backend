import { Router } from "express";
import { requestLeave , getAllLeaves , getLeaveById , getLeaveByUserId } from "../controllers/leave.controller";
import authMiddleware from "../middilewares/auth";
import { requireAdminOrHRRole, requireAny, requireEmployeeRole } from "../middilewares/role";

const router = Router();
router.use(authMiddleware);

router.post("/", requireEmployeeRole, requestLeave);
router.get("/all",requireAdminOrHRRole,getAllLeaves)
router.get("/:id",requireAdminOrHRRole,getLeaveById)
router.get("/user/:id",requireAny,getLeaveByUserId)

export default router;