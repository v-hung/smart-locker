import { FastifyInstance } from "fastify";

export const authSchema = { security: [{ bearerAuth: [] }] };

export function withDocs(
  routes: (app: FastifyInstance, options: Object) => Promise<void> | void,
  tag: string,
  auth?: boolean
) {
  return async (instance: FastifyInstance, options: Object) => {
    instance.addHook("onRoute", (routeOptions) => {
      routeOptions.schema = {
        ...routeOptions.schema,
        tags: [tag],
        ...(auth ? authSchema : {}),
      };
    });

    await routes(instance, options);
  };
}
