import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    username: z
      .string()
      .min(1, { message: "EL nombre de usuario es requerido" }),
    email: z
      .string()
      .min(1, { message: "El correo es requerido" })
      .email({ message: "El correo no es válido" }),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "La contraseña de confirmación es requerida" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no son iguales",
    path: ["passwordConfirmation"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
