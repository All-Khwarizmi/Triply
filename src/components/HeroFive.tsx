"use client";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import {
  DateRangePicker,
  type RangeKeyDict,
  type Range,
} from "react-date-range";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section, Container } from "./hero-five-props";

import Header from "./ui/Header";
import { ModeToggle } from "./ui/ModeToggle";
import { useState } from "react";
import dayjs from "dayjs";

export default function Hero() {
  const [startTrip, setStartTrip] = useState<boolean>(false);
  const [tripDates, setTripDates] = useState<Range>({
    startDate: new Date(),
    endDate: dayjs().add(7, "days").toDate(),
    key: "selection",
  });

  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStartTrip(true);
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    console.log(ranges.selection);
    setTripDates(ranges.selection);
  };

  return (
    <Section>
      <Container className="flex justify-end py-0">
        <ModeToggle />
      </Container>
      <Container>
        <div className="flex flex-col items-center text-center mb-6">
          <Header />
          <h1 className="!mb-0">
            <Balancer className="text-4xl mb-6">
              Plan Everything, Decide on the Fly
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              Start your adventure by choosing your trip dates.
            </Balancer>
          </h3>
          {startTrip ? (
            <form
              onSubmit={handleSubmission}
              className="space-y-2 text-left py-4 flex justify-center flex-col gap-4"
            >
              <DateRangePicker
                className="text-black !bg-slate-700"
                ranges={[tripDates]}
                onChange={handleSelect}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          ) : (
            <Section>
              <Button className="" onClick={() => setStartTrip(true)}>
                Start Tripping
              </Button>
            </Section>
          )}
          <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="not-prose h-full w-full object-cover object-bottom"
              src={"/hero.jpg"}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
              blurDataURL="/hero.jpg"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
