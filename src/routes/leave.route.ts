import { Router } from "express";
import { requestLeave , getAllLeaves } from "../controllers/leave.controller";
import authMiddleware from "../middilewares/auth";
import { requireAdminOrHRRole, requireEmployeeRole } from "../middilewares/role";

const router = Router();
router.use(authMiddleware);

router.post("/", requireEmployeeRole, requestLeave);
router.get("/all",requireAdminOrHRRole,getAllLeaves)


export default router;