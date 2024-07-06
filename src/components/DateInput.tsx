// DateInput.tsx
import type React from "react";
import dayjs from "dayjs";
import { useTimelineContext } from "../app/timectx/Context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DateInput: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useTimelineContext();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(dayjs(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(dayjs(e.target.value));
  };

  return (
    <div className="flex  w-full gap-4">
      <div className="space-y-2">
        <Label className="">Start Date:</Label>
        <Input
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="space-y-2">
        <Label className="">End Date:</Label>
        <Input
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default DateInput;
