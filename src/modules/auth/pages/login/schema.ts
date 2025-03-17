import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "El email es requerido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
