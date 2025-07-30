import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, varchar, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const usersTable = mysqlTable("users_table", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: timestamp({ fsp: 3, mode: 'string' }),
	image: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
	password: varchar({ length: 255 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_table_id"}),
	unique("users_table_email_unique").on(table.email),
	unique("users_table_name_unique").on(table.name),
]);
