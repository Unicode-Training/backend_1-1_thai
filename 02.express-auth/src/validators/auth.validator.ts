import z from "zod";

export const loginSchema = z.object({
    email: z.string({ error: "Email is required" }).pipe(z.email('Email invalid')),
    password: z.string({ error: "Password is required" })
})