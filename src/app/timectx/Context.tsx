"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";

interface TimelineContextProps {
  startDate: Dayjs;
  endDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
  setEndDate: (date: Dayjs) => void;
}

const TimelineContext = createContext<TimelineContextProps | undefined>(
  undefined
);

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error(
      "useTimelineContext must be used within a TimelineProvider"
    );
  }
  return context;
};

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(14, "day"));

  return (
    <TimelineContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      {children}
    </TimelineContext.Provider>
  );
};
