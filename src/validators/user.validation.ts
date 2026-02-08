import { z } from "zod";
import { Role } from "@prisma/client";

const createUserValidationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(8),
    role: z.enum(Role).optional().default(Role.EMPLOYEE),
    deptId: z.number(),
});

const userValidationSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    role: z.enum(Role),
});

const updateUserValidationSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(8).optional(),
    role: z.enum(Role).optional(),
    deptId: z.number().optional(),
});

export {
 userValidationSchema,
 createUserValidationSchema,
 updateUserValidationSchema
} ;