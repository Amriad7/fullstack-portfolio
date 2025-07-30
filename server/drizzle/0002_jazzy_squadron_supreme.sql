ALTER TABLE `account` MODIFY COLUMN `user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `user_id` varchar(36) NOT NULL;