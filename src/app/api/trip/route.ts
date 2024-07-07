import { remoteDatabase } from "@/drizzle";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response("Missing id", { status: 400 });
    }
    const item = await remoteDatabase.getItem(id);
    if (!item) {
      return new Response("Item not found", { status: 404 });
    }
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response("Error parsing JSON", { status: 400 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const item = await remoteDatabase.setItem(body.key, body.value);
    return new Response(JSON.stringify({ ...body, item }), { status: 200 });
  } catch (error) {
    return new Response("Error parsing JSON", { status: 400 });
  }
}
