CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`frequency` real NOT NULL,
	`last_completed` integer,
	`created_at` integer NOT NULL
);
