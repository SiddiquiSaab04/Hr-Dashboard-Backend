import { z } from "zod";

const loginValidationSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
});

export {loginValidationSchema};