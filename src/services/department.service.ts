import prisma from "../prisma/client";

export class DepartmentService {
    static async createDepartment(deptName:string) {
      const department = await prisma.department.create({
        data: {
          deptName,
        },
      });
      return department;
    }

    static async getAllDepartments() {
      const departments = await prisma.department.findMany();
      return departments;
    }

    static async getDepartmentById(id: number) {
      const department = await prisma.department.findUnique({
        where: { id },
      });
      if (!department) {
        throw new Error("Department not found");
      }
      return department;
    }

    static async updateDepartment(id: number, deptName: string) {
      const existingDepartment = await prisma.department.findUnique({
        where: { id },
      });
      if (!existingDepartment) {
        throw new Error("Department not found");
      }
      const department = await prisma.department.update({
        where: { id },
        data: {
          deptName,
        },
      });
      return department;
    }

    static async deleteDepartment(id: number) {
      const existingDepartment = await prisma.department.findUnique({
        where: { id },
      });
      if (!existingDepartment) {
        throw new Error("Department not found");
      }
      await prisma.department.delete({
        where: { id },
      });
      return { message: "Department deleted successfully" };
    }
}

export default DepartmentService;
