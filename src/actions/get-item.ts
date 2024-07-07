"use server";
import type { Trip } from "@/drizzle/schema";

export async function getItem(key: string): Promise<{ data: Trip } | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/trip?id=${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      return null;
    }
    const data = await response.json();
    const body = JSON.parse(JSON.stringify({ data }));
    return body as { data: Trip };
  } catch (error) {
    console.error(error);
    return null;
  }
}
