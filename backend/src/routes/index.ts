import { FastifyInstance } from "fastify";
import authRoutes from "./auth.routes";
import lockerRoutes from "./locker.routes";
import userRoutes from "./user.routes";
import { withDocs } from "../utils/router.utils";

export default async function registerRoutes(app: FastifyInstance) {
  app.register(withDocs(authRoutes, "auth"), { prefix: "/auth" });
  app.register(withDocs(lockerRoutes, "locker", true), { prefix: "/lockers" });
  app.register(withDocs(userRoutes, "user", true), { prefix: "/users" });
}
