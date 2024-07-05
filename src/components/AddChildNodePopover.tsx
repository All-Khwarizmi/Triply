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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function AddChildNodePopover(props: {
  handleAddChild: ({ childNode }: { childNode: NodeExtend }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tripDate, setTripDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [status, setStatus] = useState<NodeExtend["data"]["status"]>("new"); // ["new", "conditional", "must-do", "if-time"
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
    setTripName("");
    setTripBody("");
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
          <div>
            <Label htmlFor="trip-date">Trip Date</Label>
            <Input
              id="trip-date"
              type="date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="trip-body">Trip Body</Label>
            <Input
              id="trip-body"
              value={tripBody}
              onChange={(e) => setTripBody(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={status}
              onValueChange={(e) => {
                if (
                  e !== "new" &&
                  e !== "conditional" &&
                  e !== "must-do" &&
                  e !== "if-time"
                )
                  return;
                setStatus(e);
              }}
            >
              <SelectTrigger>
                <SelectValue>{status}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>

                  {["new", "conditional", "must-do", "if-time"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmission}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddChildNodePopover;
