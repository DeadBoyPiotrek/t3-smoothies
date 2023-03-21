import { z } from "zod";
export const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
});
