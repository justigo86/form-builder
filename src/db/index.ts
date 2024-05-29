import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/drizzle" ||
  "postgres://postgres:postgres@localhost:5432/postgres";

// const client = postgres(connectionString);
// export const db = drizzle(client, { schema });

//following implemented to prevent memory leak and disconnect appropriately from supabase
//allows pushing db schema changes - https://github.com/orgs/supabase/discussions/18986
let client = postgres(connectionString);

if (process.env.NODE_ENV === "production") {
  client = postgres(process.env.DATABASE_URL!, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };

  if (!globalConnection.connection) {
    globalConnection.connection = postgres(process.env.DATABASE_URL!, {
      prepare: false,
    });
  }

  client = globalConnection.connection;
}

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});
