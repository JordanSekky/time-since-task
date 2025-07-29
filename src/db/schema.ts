import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	frequency: real("frequency").notNull(), // in hours
	lastCompleted: integer("last_completed"), // timestamp in milliseconds
	lastCompletedByLogin: text("last_completed_by_login"),
	lastCompletedByName: text("last_completed_by_name"),
	lastCompletedByProfilePic: text("last_completed_by_profile_pic"),
	createdAt: integer("created_at").notNull(), // timestamp in milliseconds
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
