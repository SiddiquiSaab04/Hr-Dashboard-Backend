import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { createUserValidationSchema } from "../validators/user.validation";
const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        message: "Password must be at least 8 characters long",
      });
    }

    const validateInput = createUserValidationSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).send({
        message: validateInput.error.issues[0].message,
      });
    }

    const data = await UserService.createUser(validateInput.data);
    res.status(201).send({
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      message: "User created successfully",
    });
  } catch (error: any) {
    console.error(error);

    if (error.message === "User already exists") {
      return res.status(400).send({ message: error.message });
    }

    res.status(500).send({ message: "Internal server error" });
  }
};

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).send(
      users.map((user: any) => {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }),
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getUserController = async ( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id);
    res.status(200).send(user);
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      return res.status(404).send({ message: error.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
}



export { createUserController, getAllUsersController, getUserController };
