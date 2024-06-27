// DateInput.tsx
import type React from "react";
import dayjs from "dayjs";
import { useTimelineContext } from "./Context";

const DateInput: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useTimelineContext();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(dayjs(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(dayjs(e.target.value));
  };

  return (
    <div className="mt-4">
      <label className="block mb-2">
        Start Date:
        <input
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          onChange={handleStartDateChange}
          className="ml-2 p-1 border rounded"
        />
      </label>
      <label className="block">
        End Date:
        <input
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          onChange={handleEndDateChange}
          className="ml-2 p-1 border rounded"
        />
      </label>
    </div>
  );
};

export default DateInput;
