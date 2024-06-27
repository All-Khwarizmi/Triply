// Timeline.tsx
import type React from "react";
import { useTimelineContext } from "./Context";

const Timeline: React.FC = () => {
  const { startDate, endDate } = useTimelineContext();
  const totalDays = endDate.diff(startDate, "day");

  return (
    <div className="relative w-full h-10 bg-gray-200">
      <div className="absolute top-1/2 w-full h-0.5 bg-black" />
      <div
        className="absolute top-0 left-0 h-full border-l-2 border-red-500"
        style={{ left: "0%" }}
        title={startDate.format("YYYY-MM-DD")}
      />
      <div
        className="absolute top-0 right-0 h-full border-l-2 border-red-500"
        style={{ right: "0%" }}
        title={endDate.format("YYYY-MM-DD")}
      />
    </div>
  );
};

export default Timeline;
