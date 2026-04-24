import { auth } from "@my-better-t-app/auth";
import type { Context as HonoContext } from "hono";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const authSession = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  return {
    session: authSession?.session ?? null,
    user: authSession?.user ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
