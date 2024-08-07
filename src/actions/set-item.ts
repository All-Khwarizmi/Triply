"use server";

import { BASE_URL } from "@/utils/constants/base-url";

export async function setItem(key: string, value: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/api/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });
    if (!response.ok) {
      console.error(response.statusText);
      throw new Error("Failed to set item");
    }
    const body = await response.json();
    return body.item.id;
  } catch (error) {
    console.log(error);
    return "";
  }
}
