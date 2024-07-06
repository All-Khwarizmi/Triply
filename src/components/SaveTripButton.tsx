import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
function SaveTripButton(props: { saveTrip: (tripName: string) => void }) {
  const [tripName, setTripName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  function handleSubmission() {
    if (!tripName) {
      alert("Please enter a trip name");
      return;
    }
    props.saveTrip(tripName);
    setOpen(false);
    setTripName("");
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <p
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full"
        >
          Save
        </p>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <Label>Enter Trip Name</Label>
          <Input
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <Button onClick={handleSubmission}>Save Trip</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SaveTripButton;
