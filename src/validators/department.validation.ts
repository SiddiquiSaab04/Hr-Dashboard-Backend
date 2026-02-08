import {z} from "zod";

export const createDepartmentValidationSchema = z.object({
    name: z.string().min(1, "Department name is required").max(50,"Department name must be at most 50 characters"),
});

