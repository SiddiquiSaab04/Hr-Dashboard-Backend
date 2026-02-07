import { createUserController, getAllUsersController, getUserController, updateUserController, deleteUserController, getAllEmployeesController , getAllHrsController } from "../controllers/user.controller";
import { Router } from "express";
import authMiddleware from "../middilewares/auth";
import { requireAdminOrHRRole, requireAdminRole } from "../middilewares/role";

const router = Router();

router.use(authMiddleware);

router.post("/create-user", requireAdminOrHRRole, createUserController);
router.get("/get-users", requireAdminOrHRRole, getAllUsersController);
router.get("/get-user/:id", requireAdminOrHRRole, getUserController);
router.put("/update-user/:id", requireAdminOrHRRole, updateUserController);
router.delete("/delete-user/:id", requireAdminOrHRRole, deleteUserController);
router.get("/get-all-employees", requireAdminOrHRRole, getAllEmployeesController);
router.get("/get-all-hrs", requireAdminRole , getAllHrsController);

export default router;
