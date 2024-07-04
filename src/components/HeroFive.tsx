"use client";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section, Container } from "./hero-five-props";

import Header from "./ui/Header";
import { ModeToggle } from "./ui/ModeToggle";

export default function Hero() {
  return (
    <Section>
      <Container className="flex justify-end py-0">
        <ModeToggle />
      </Container>
      <Container>
        <div className="flex flex-col items-center text-center mb-6">
          <Header />
          <h1 className="!mb-0">
            <Balancer>
              <h3 className="text-4xl mb-6">
                Plan Everything, Decide on the Fly
              </h3>
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              Start your adventure by choosing your trip dates.
            </Balancer>
          </h3>
          <form onSubmit={() => {}} className="space-y-2 text-left">
            <Input />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
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
