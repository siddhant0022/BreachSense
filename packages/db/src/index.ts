import { env } from "@my-better-t-app/env/server";
import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../prisma/generated/client/client";

declare global {
  // Reuse the Prisma client during local hot reloads.
  // eslint-disable-next-line no-var
  var __breachsensePrisma: PrismaClient | undefined;
}

export function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: env.DATABASE_URL,
  });

  return new PrismaClient({ adapter });
}

const prisma = globalThis.__breachsensePrisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalThis.__breachsensePrisma = prisma;
}

export default prisma;
