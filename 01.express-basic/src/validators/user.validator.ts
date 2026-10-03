import z from "zod";

export const createUserSchema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).pipe(z.email("Email invalid")),
    status: z.boolean().optional().nullable()
})