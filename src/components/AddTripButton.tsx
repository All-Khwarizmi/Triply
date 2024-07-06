import React, { useState } from "react";
import type { AddRoadtripButtonProps } from "./AddRoadtripButton";
import type { NodeData, NodeExtend } from "@/utils/list";
import dayjs from "dayjs";
import { createTripNodeExtend } from "../../test/node-extend-helper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
function AddTripButton(props: {
  updateNodeMetadata: (
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date" | "status">
    >
  ) => void;
  addNode: (node: NodeExtend) => void;
  removeNode: (nodeId: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [tripName, setTripName] = useState<string>("");

  const [status, setStatus] = useState<NodeExtend["data"]["status"]>("new");
  function handleSubmission() {
    const node: NodeExtend = createTripNodeExtend({
      startDate: dayjs(date),
      name: tripName,
      body: "",
      status,
      updateNodeMetadata: props.updateNodeMetadata,
      removeNode: props.removeNode,
    });
    props.addNode(node);
    setOpen(false);
    setTripName("");
  }

  function handleSelect(date: Date) {
    setDate(date);
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <p onClick={() => setOpen(!open)}>Add Trip</p>
        </PopoverTrigger>
        <PopoverContent>
          <Label>Date</Label>
          <Input
            type="date"
            value={dayjs(date).format("YYYY-MM-DD")}
            onChange={(e) => handleSelect(new Date(e.target.value))}
          />
          <Label>Name</Label>
          <Input
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <Label htmlFor="status">Status</Label>
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
          <Button onClick={handleSubmission}>Submit</Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default AddTripButton;
