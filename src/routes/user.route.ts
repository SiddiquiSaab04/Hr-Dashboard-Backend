import { createUserController, getAllUsersController, getUserController, updateUserController, deleteUserController } from "../controllers/user.controller";
import { Router } from "express";
import authMiddleware from "../middilewares/auth";
import { requireAdminOrHRRole } from "../middilewares/role";

const router = Router();

router.use(authMiddleware);
router.use(requireAdminOrHRRole);

router.post("/create-user", createUserController);
router.get("/get-users", getAllUsersController);
router.get("/get-user/:id", getUserController);
router.put("/update-user/:id", updateUserController);
router.delete("/delete-user/:id", deleteUserController);

export default router;
