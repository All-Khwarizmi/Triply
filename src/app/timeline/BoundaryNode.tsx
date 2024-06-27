import React from "react";
import { Handle, Position } from "reactflow";

const BoundaryNode = ({ data }: { data: { date: string } }) => {
  return (
    <div
      className="nodrag text-black border rounded-md flex flex-col p-1 bg-gray-300"
      style={{ height: "100%", minWidth: "2px", backgroundColor: "red" }}
    >
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default BoundaryNode;
