import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: varchar({ length: 255 }).notNull(),
});

export const usersTable = pgTable('users', {
  id: integer().primaryKey(), // Primary Key
  username: varchar({ length: 255 }).notNull().unique(), // Unique Username
  password: varchar({ length: 255 }).notNull(), // Passwortfeld
});
