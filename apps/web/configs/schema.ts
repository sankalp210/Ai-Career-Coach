import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";
// import { json } from "stream/consumers";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});

export const HistoryTable=pgTable('historyTable', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId: varchar().notNull(),
    content: json(),
    userEmail: varchar('userEmail').references(() => usersTable.email),
    createdAt: varchar()
});