import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/client";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized: Authorization header is missing" });
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized: User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

export default authMiddleware;
