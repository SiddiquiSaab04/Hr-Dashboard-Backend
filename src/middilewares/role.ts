import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";

function authorizeRoles(allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).send({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(403).send({ message: "Forbidden" });
    }
  };
}

export const requireAdminRole = authorizeRoles([Role.ADMIN]);
export const requireEmployeeRole = authorizeRoles([Role.EMPLOYEE]);
export const requireHRRole = authorizeRoles([Role.HR]);
export const requireAdminOrHRRole = authorizeRoles([Role.ADMIN, Role.HR]);
export const requireAny = authorizeRoles([Role.ADMIN, Role.EMPLOYEE, Role.HR]);
