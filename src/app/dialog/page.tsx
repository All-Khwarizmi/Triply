"use client";

import TripNode from "@/components/TripNode";
import { Section } from "@/components/hero-five-props";
import React from "react";
import { mockData } from "@/components/mock-data";
import RoadTripNode from "@/components/RoadTripNode";
function page() {
  return (
    <Section className=" flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-center">Dialog</h1>
      <div className="grid grid-cols-1 gap-8 w-72">
        {mockData.map((node) => {
          if (node.data.typeOfTrip === "trip") {
            return <TripNode key={node.id} node={node} />;
          }
          return <RoadTripNode key={node.id} node={node} />;
        })}
      </div>
   
    </Section>
  );
}

export default page;
