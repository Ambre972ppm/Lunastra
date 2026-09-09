CREATE TABLE `calculations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`cache_key` text NOT NULL,
	`profile_revision` integer NOT NULL,
	`method_version` text NOT NULL,
	`result_json` text NOT NULL,
	`calculated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_calculations_user_key` ON `calculations` (`user_id`,`cache_key`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content_key` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_favorites_user_content` ON `favorites` (`user_id`,`content_key`);--> statement-breakpoint
CREATE TABLE `journal_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`body` text NOT NULL,
	`mood` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_notes_user_updated` ON `journal_entries` (`user_id`,`updated_at`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`birth_json` text NOT NULL,
	`birth_name` text,
	`preferences_json` text NOT NULL,
	`current_time_zone` text NOT NULL,
	`current_hemisphere` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`identity_subject` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_identity_subject_unique` ON `users` (`identity_subject`);