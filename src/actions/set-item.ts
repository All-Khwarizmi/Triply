export async function setItem(key: string, value: string): Promise<string> {
  const response = await fetch("/api/trip", {
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
  return body.id;
}
