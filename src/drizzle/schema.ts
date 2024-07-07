import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";
import { SaveList } from "../utils/data";

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("key").unique().notNull(),
  trip: text("value").notNull(),
});
