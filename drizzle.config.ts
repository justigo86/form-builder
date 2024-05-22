import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL ||
//     "postgres://postgres:postgres@localhost:5432/drizzle" ||
//     "postgres://postgres:postgres@localhost:5432/postgres"
//   },
// } satisfies Config;
