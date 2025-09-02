CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'guest',
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `lockers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`locker_code` text NOT NULL,
	`location` text NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lockers_locker_code_unique` ON `lockers` (`locker_code`);