import React, { memo } from "react";
import type { NodeProps } from "reactflow";
import { cn } from "../utils/cn";

export const StageColumnNode = ({ data }: NodeProps) => {
  const [height, setHeight] = React.useState(72);
  return (
    <div
      className={cn("p-1 flex bg-gray-300 nodrag")}
      style={{ height: `${height}px`, width: "2px", backgroundColor: "red" }}
    />
  );
};

export default memo(StageColumnNode);
