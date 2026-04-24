import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const generatedClientFile = path.resolve(import.meta.dir, "../prisma/generated/client/client.ts");

async function hasGeneratedClient() {
  try {
    await access(generatedClientFile);
    return true;
  } catch {
    return false;
  }
}

const alreadyGenerated = await hasGeneratedClient();

if (alreadyGenerated) {
  console.log("Prisma client already present, skipping postinstall generate.");
  process.exit(0);
}

const command = Bun.spawn(["bun", "run", "db:generate"], {
  cwd: path.resolve(import.meta.dir, ".."),
  stdout: "inherit",
  stderr: "inherit",
});

const exitCode = await command.exited;

if (exitCode === 0) {
  process.exit(0);
}

if (await hasGeneratedClient()) {
  console.warn("Prisma generate reported an error during postinstall, but the client exists. Continuing.");
  process.exit(0);
}

process.exit(exitCode);
