import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUserValidationSchema } from "../validators/user.validation";

export class UserService {
  static async createUser(userData: Prisma.UserCreateInput) {
    const secretKey = process.env.SECRET_KEY as string;
    const validateInput = createUserValidationSchema.parse(userData);
    const { email, name, password, role } = validateInput;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    const token = await jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  static async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}
