import dayjs from "dayjs";
import { useState } from "react";
import {
  DateRangePicker,
  type RangeKeyDict,
  type Range,
} from "react-date-range";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import type { NodeExtend, NodeData } from "@/utils/list";

import {
  createRoadTripNodeExtend,
  generateRandomNodeName,
} from "../../test/node-extend-helper";

export interface AddRoadtripButtonProps {
  addNode: (node: NodeExtend) => void;
  updateChildNode(
    parentNodeId: string,
    childNodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ): void;
  removeNode: (nodeId: string) => void;
  removeChildNode: (parentNodeId: string, childNodeId: string) => void;
  addChildNode: (parentNodeId: string, node: NodeExtend) => void;
}
function AddRoadtripButton(props: AddRoadtripButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [tripDates, setTripDates] = useState<Range>({
    startDate: new Date(),
    endDate: dayjs().add(7, "days").toDate(),
    key: "selection",
  });
  const [tripName, setTripName] = useState<string>("");
  const handleSelect = (ranges: RangeKeyDict) => {
    setTripDates(ranges.selection);
  };
  function handleSubmission() {
    const defaultTripName = generateRandomNodeName();
    if (!tripName) {
      setTripName(defaultTripName);
    }
    const node: NodeExtend = createRoadTripNodeExtend({
      startDate: dayjs(tripDates.startDate),
      endDate: dayjs(tripDates.endDate),
      updateChildNode: props.updateChildNode,
      addChildNode: props.addChildNode,
      removeChildNode: props.removeChildNode,
      removeNode: props.removeNode,
      name: tripName === "" ? defaultTripName : tripName,
    });
    props.addNode(node);
    setOpen(false);
  }
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <p>Add Roadtrip</p>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="p-4 flex flex-col gap-4 w-min">
            <Label htmlFor="trip-name">Trip Name</Label>
            <Input
              id="trip-name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
            <Label htmlFor="trip-dates">Trip Dates</Label>
            <DateRangePicker
              className=" text-black overflow-scroll"
              ranges={[tripDates]}
              onChange={handleSelect}
              editableDateInputs
              moveRangeOnFirstSelection={false}
            />
            <Button onClick={handleSubmission} className="w-full">
              Save
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default AddRoadtripButton;
