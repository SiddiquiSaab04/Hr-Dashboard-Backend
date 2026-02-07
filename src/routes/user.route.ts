import { createUserController, getAllUsersController , getUserController , updateUserController } from "../controllers/user.controller";
import { Router } from "express";
import authMiddleware from "../middilewares/auth";

const router = Router();

router.post("/create-user",authMiddleware,createUserController);
router.get("/get-users",authMiddleware,getAllUsersController);
router.get("/get-user/:id",authMiddleware,getUserController);
router.put("/update-user/:id",authMiddleware,updateUserController);

export default router;