// CustomNode.tsx
import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { cn } from "../utils/cn";

const CustomNode = ({ data }: NodeProps) => {
  const [height, setHeight] = React.useState(24);
  return (
    <div className={cn("custom-node nodrag")}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
