import React from "react";
import type { NodeProps } from "reactflow";

function TimeLineNode(props: NodeProps) {
  return (
    <>
      <div
        className={`
      nodrag text-black
        border rounded-md
        flex flex-col p-1
        w-screen border-white bg-gray-300
      `}
      />
    </>
  );
}

export default TimeLineNode;
