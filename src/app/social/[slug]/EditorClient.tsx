"use client";
import { getItem } from "@/actions/get-item";
import TripEditor from "@/components/TripEditor";
import { Section } from "@/components/hero-five-props";
import Header from "@/components/ui/Header";
import type { Trip } from "@/drizzle/schema";
import type { SaveList } from "@/utils/data";
import { NodeList } from "@/utils/list";
import React, { useMemo } from "react";
class FakeDB implements SaveList {
  private trip: Trip;
  constructor(trip: Trip) {
    this.trip = trip;
  }
  setItem(key: string, value: string) {}
  getItem(key: string) {
    return this.trip.trip;
  }
}
export function EditorClient(props: {
  id: string;
  name: string;
  trip: string;
}) {
  const db = useMemo(
    () =>
      new FakeDB({
        name: props.name,
        id: props.id,
        trip: props.trip,
      }),
    [props.id, props.name, props.trip]
  );
  const nodeList = useMemo(() => NodeList.restore("", db), [db]);
  if (!nodeList) {
    return (
      <div className="text-center text-gray-500 text-xl">Failed to parse </div>
    );
  }
  return (
    <Section className="flex flex-col gap-8 p-8">
      <Header />
      <TripEditor nodeList={nodeList} tripDates={nodeList.getTripDates()} />;
    </Section>
  );
}
