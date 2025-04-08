import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  image: z.instanceof(File, { message: "La imagen es requerida" }).refine(
    (file) => {
      const validTypes = ["image/jpeg", "image/png"];
      return validTypes.includes(file.type);
    },
    { message: "El archivo debe ser una imagen JPEG o PNG" }
  ),
});

export type TPostSchema = z.infer<typeof postSchema>;
