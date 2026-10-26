import z from "zod";
// const blacklistEmail = ['admin@gmail.com', 'demo@gmail.com'];
// export const createUserSchema = z.object({
//     name: z.string({ error: "Name is required" }),
//     email: z.string({ error: "Email is required" }).pipe(z.email("Email invalid")).refine(async (value: string) => {
//         return !blacklistEmail.includes(value);
//     }, "Email bị cấm"),
//     status: z.enum(['ACTIVE', 'INACTIVE'], "Status phải là: ACTIVE, INACTIVE").optional(),
//     birthday: z.iso.datetime(),
//     age: z.coerce.number(),
//     password: z.string({ error: "Password không được để trống" }).min(6, "Password phải từ 6 ký tự"),
//     confirmPassword: z.string({ error: "Password không được để trống" }).min(6, "Password phải từ 6 ký tự"),
//     permissions: z.array(z.string({ error: "Phần tử phải là string" })).min(1, "Phải có ít nhất 1 phần tử"),
//     attributes: z.array(z.object({
//         attributeId: z.number(),
//         values: z.array(z.number()).min(1)
//     })).min(1)
// }).superRefine(({ password, confirmPassword }, ctx) => {
//     if (confirmPassword !== password) {
//         ctx.addIssue({
//             message: "confirmPassword không khớp",
//             path: ["confirmPassword"],
//             code: "custom"
//         })
//     }
// })

//enum: active, inactive
//iso date, iso datetime
//Ép kiểu number: z.coerce.number()
//Regex
//refine: Viết logic riêng
//nested

export const createUserSchema = z.object({
    fullName: z.string(),
    email: z.string({ error: "Email is required" }).pipe(z.email("Email invalid")),
    password: z.string(),
    status: z.enum(['ACTIVE', 'INACTIVE'], "Status phải là: ACTIVE, INACTIVE")
})