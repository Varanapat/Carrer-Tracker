import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js convention: real secrets live in .env.local (gitignored), not .env
loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations need the direct (non-pooled) connection — pgbouncer's
    // transaction pooling mode doesn't support the session-level features
    // `prisma migrate` relies on.
    url: process.env["DIRECT_URL"],
  },
});
