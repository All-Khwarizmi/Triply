import { NodeList } from "./list";

export function getTriplyKeys(db: Storage): Set<string> {
  const triplyKeys = db.getItem("triply-keys");
  if (!triplyKeys) {
    return new Set<string>();
  }
  return new Set<string>(JSON.parse(triplyKeys));
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function fetchAllTrips(db: Storage): [string, NodeList][] {
  const triplyKeys = getTriplyKeys(db);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const trips: [string, NodeList][] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  triplyKeys.forEach((key) => {
    console.log("key", key);
    const tripData = NodeList.restore(key, db);
    if (tripData) {
      trips.push([key, tripData]);
    }
  });

  return trips;
}
