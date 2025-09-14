import { FastifyInstance } from "fastify";
import authRoutes from "./auth.routes";
import lockerRoutes from "./locker.routes";
import userRoutes from "./user.routes";
import userBranches from "./branch.routes";
import { routeWith } from "../utils/router.utils";

export default async function registerRoutes(app: FastifyInstance) {
  app.register(routeWith(authRoutes, "auth"), { prefix: "/auth" });
  app.register(routeWith(lockerRoutes, "locker", true), { prefix: "/lockers" });
  app.register(routeWith(userRoutes, "user", true), { prefix: "/users" });
  app.register(routeWith(userBranches, "branch", true), {
    prefix: "/branches",
  });
}
