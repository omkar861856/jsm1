import { pgTable, unique, uuid, varchar, integer, text, date, timestamp, pgEnum } from "drizzle-orm/pg-core"

export const role = pgEnum("role", ['USER', 'ADMIN'])
export const status = pgEnum("status", ['PENDING', 'APPROVED', 'REJECTED'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	universityId: integer("university_id").notNull(),
	password: text().notNull(),
	universityCard: text("university_card").notNull(),
	status: status().default('PENDING').notNull(),
	role: role().default('USER').notNull(),
	lastActivityDate: date("last_activity_date").defaultNow().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	email: varchar({ length: 255 }).notNull(),
}, (table) => [
	unique("users_university_id_unique").on(table.universityId),
	unique("users_university_card_unique").on(table.universityCard),
	unique("users_email_unique").on(table.email),
]);
