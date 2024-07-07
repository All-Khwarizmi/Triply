import type { Trip } from "@/drizzle/schema";

export async function getItem(key: string): Promise<Trip | null> {
  try {
    const response = await fetch(`/api/trip?id=${key}`);
    if (!response.ok) {
      console.error(response.statusText);
      return null;
    }
    const body = await response.json();
    return body as Trip;
  } catch (error) {
    return null;
  }
}
