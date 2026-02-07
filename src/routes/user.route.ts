import { createUserController, getAllUsersController } from "../controllers/user.controller";
import { Router } from "express";
import authMiddleware from "../middilewares/auth";

const router = Router();

router.post("/create-user",authMiddleware,createUserController);
router.get("/get-users",authMiddleware,getAllUsersController);

export default router;