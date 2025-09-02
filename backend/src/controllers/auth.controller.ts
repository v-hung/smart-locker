import { FastifyReply, FastifyRequest } from "fastify";
import db from "../config/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { loginBodyType } from "../schemas/auth/login.schema";

export const login = async (
  req: FastifyRequest<{ Body: loginBodyType }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return reply.status(401).send({ message: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return reply.status(401).send({ message: "Invalid email or password" });
  }

  const token = req.server.jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role ?? "",
  });

  reply.send({ token, user });
};
