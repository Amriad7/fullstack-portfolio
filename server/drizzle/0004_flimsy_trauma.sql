CREATE TABLE `settings` (
	`id` varchar(36) NOT NULL DEFAULT 'website_settings',
	`title` varchar(120) NOT NULL,
	`description` text NOT NULL,
	`keywords` text NOT NULL,
	`name` varchar(120) NOT NULL,
	`bio` text NOT NULL,
	`github_url` text,
	`linkedin_url` text,
	`email_url` text,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
