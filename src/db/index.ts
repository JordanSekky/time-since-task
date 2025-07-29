import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as schema from "./schema";

// Create SQLite database
const sqlite = new Database("data/tasks.db");

// Create Drizzle instance
export const db = drizzle(sqlite, { schema });

// Run migrations
migrate(db, { migrationsFolder: "./drizzle" });

export { sqlite };
