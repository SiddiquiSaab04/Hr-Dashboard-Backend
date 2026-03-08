import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;
export const tokenBlacklist = new Set<string>();
async function Login(credentials: any) {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, secretKey, {
    expiresIn: "1h",
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

async function Logout(token: string) {
  tokenBlacklist.add(token);
    console.log("Blacklist after logout:", tokenBlacklist);
}
function isTokenBlacklisted(token: string): boolean {
    console.log("Checking blacklist:", tokenBlacklist);
  return tokenBlacklist.has(token);
}

export {Login, Logout, isTokenBlacklisted };