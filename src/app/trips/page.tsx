"use client";

import Timeline from "@/components/Timeline";
import type { NodeList } from "@/utils/list";
import { fetchAllTrips } from "@/utils/trip-keys";
import { useEffect, useState } from "react";

const AllTripsComponent = () => {
  const [trips, setTrips] = useState<[string, NodeList][]>([]);

  useEffect(() => {
    const tripsData = fetchAllTrips(localStorage);
    console.log("tripsData", tripsData);
    setTrips(tripsData);
  }, []);

  return (
    <div>
      {trips.map((trip, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Timeline key={index} nodes={trip[1].traverse()} name={trip[0]} />
      ))}
    </div>
  );
};

export default AllTripsComponent;
