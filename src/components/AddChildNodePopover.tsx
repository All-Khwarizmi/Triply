import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import type { NodeExtend } from "@/app/timectx/helpers/list";
import { createTripNodeExtend } from "../../test/node-extend-helper";

function AddChildNodePopover(props: {
  handleAddChild: ({ childNode }: { childNode: NodeExtend }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tripDate, setTripDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [tripName, setTripName] = useState<string>("");
  const [tripBody, setTripBody] = useState<string>("");
  function handleSubmission() {
    const node: NodeExtend = createTripNodeExtend({
      startDate: dayjs(tripDate),
      name: tripName,
      body: tripBody,
    });
    props.handleAddChild({ childNode: node });
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button>Add Child Node</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4 space-y-4">
          <Label htmlFor="trip-name">Trip Name</Label>
          <Input
            id="trip-name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <Label htmlFor="trip-date">Trip Date</Label>
          <Input
            id="trip-date"
            type="date"
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
          />
          <Label htmlFor="trip-body">Trip Body</Label>
          <Input
            id="trip-body"
            value={tripBody}
            onChange={(e) => setTripBody(e.target.value)}
          />
          <Button onClick={handleSubmission}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddChildNodePopover;
