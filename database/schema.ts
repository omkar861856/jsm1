import { timestamp } from "drizzle-orm/pg-core";
import { uuid, pgTable, varchar, integer, text, pgEnum, date } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);


export const users = pgTable("users", {
  id:uuid('id').notNull().primaryKey().defaultRandom().unique(),
  email: varchar('email', {length:255}).notNull().unique(),
  fullName:varchar('full_name', {length:255}).notNull(),
  universityId: integer('university_id').notNull().unique(),
  password: text('password').notNull(),
  universityCard: text('university_card').notNull().unique(),
  status: STATUS_ENUM('status').notNull().default('PENDING'),
  role: ROLE_ENUM('role').notNull().default('USER'),
  date: date('last_activity_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});


