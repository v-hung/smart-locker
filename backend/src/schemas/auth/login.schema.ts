import z from "zod";
import { userSelectSchema } from "../../db/schema";

export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type loginBodyType = z.infer<typeof loginBodySchema>;

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userSelectSchema,
});
