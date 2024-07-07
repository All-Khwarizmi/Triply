import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { type Trip, trips } from "./schema";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString);
const db = drizzle(client);

export class RemoteDatabase {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async setItem(
    key: string,
    value: string
  ): Promise<{
    id: string;
    name: string;
    trip: string;
  } | null> {
    const item = await db
      .insert(trips)
      .values({ name: key, trip: value })
      .returning();
    console.log(item);
    if (item.length === 0) return null;
    return item[0];
  }
  async getItem(key: string): Promise<Trip | null> {
    const trip = await db.select().from(trips).where(eq(trips.name, key));
    if (trip.length === 0) return null;
    return trip?.[0] || null;
  }
}

export const remoteDatabase = new RemoteDatabase();
