import { Request, Response } from "express";
import Login from "../services/auth.service";
import { loginValidationSchema } from "../validators/auth.validation";

async function LoginController(req: Request, res: Response) {
  try {
    const validateInput = loginValidationSchema.safeParse(req.body);
    if (!validateInput.success) {
      return res.status(400).send({
        message: validateInput.error.issues[0].message,
      });
    }
    const authData = await Login(req.body);
    return res.status(200).send(authData);
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      return res.status(404).send({ message: error.message });
    }
    if (error.message === "Invalid password") {
      return res.status(401).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
}

export default LoginController;
