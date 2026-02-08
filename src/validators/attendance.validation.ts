import {z} from "zod";

export const createAttendanceValidationSchema = z.object({
    date: z.string().datetime(),
    status: z.string().min(1),
    userId: z.number().int(),
    checkIn: z.string().datetime(),
});