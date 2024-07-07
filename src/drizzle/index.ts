import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { trips } from "./schema";
import type { SaveList } from "@/utils/data";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString);
const db = drizzle(client);

export class RemoteDatabase {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async setItem(
    key: string,
    value: string
  ): Promise<
    {
      id: string;
      name: string;
      trip: string;
    }[]
  > {
    const id = await db
      .insert(trips)
      .values({ name: key, trip: value })
      .returning();
    console.log(id);
    return id;
  }
  async getItem(key: string): Promise<string | null> {
    const trip = await db
      .select()
      .from(trips)
      .where(eq(trips.name, key))
      .execute();
    return trip?.[0].trip || null;
  }
}

export const remoteDatabase = new RemoteDatabase();
