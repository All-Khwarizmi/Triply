"use client";

import { getTrip } from "@/utils/trip-keys";
import React, { useEffect, useState } from "react";
import type { NodeList } from "@/utils/list";
import TripEditor from "@/components/TripEditor";
import { Section } from "@/components/hero-five-props";
import { Loader } from "lucide-react";

function Page({ params }: { params: { slug: string } }) {
  const [nodeList, setNodeList] = useState<NodeList | null>(null);
  const [found, setFound] = useState<boolean | null>(null);
  useEffect(() => {
    const nodeList = getTrip(localStorage, params.slug);
    setNodeList(nodeList);
    setFound(nodeList !== null);
  }, [params.slug]);

  if (!nodeList && found === null) {
    return <Loader className="mx-auto animate-spin" size={48} />;
  }

  if (!nodeList && found === false) {
    return (
      <div className="text-center text-gray-500 text-xl">No trip found</div>
    );
  }
  if (nodeList) {
    return (
      <Section className="flex flex-col gap-8 p-8">
        <h1 className="text-4xl font-bold text-center">{params.slug}</h1>
        <TripEditor nodeList={nodeList} tripDates={nodeList.getTripDates()} />;
      </Section>
    );
  }
}

export default Page;
