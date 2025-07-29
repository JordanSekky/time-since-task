import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

// Create SQLite database
const sqlite = new Database("tasks.db");

// Create Drizzle instance
export const db = drizzle(sqlite, { schema });

// Run migrations
migrate(db, { migrationsFolder: "./drizzle" });

export { sqlite };
