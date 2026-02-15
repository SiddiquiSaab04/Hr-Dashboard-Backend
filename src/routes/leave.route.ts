import { Router } from "express";
import { requestLeave } from "../controllers/leave.controller";
import authMiddleware from "../middilewares/auth";
import { requireEmployeeRole } from "../middilewares/role";

const router = Router();
router.use(authMiddleware);

router.post("/", requireEmployeeRole, requestLeave);



export default router;