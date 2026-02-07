import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUserValidationSchema } from "../validators/user.validation";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export class UserService {
  static async createUser(userData: Prisma.UserCreateInput) {
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

  static async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new Error("User not found");
    }
    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }
}
