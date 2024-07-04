"use client";
import type React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/app/timectx/CustomNode";
import PanelMenu from "@/app/timectx/Panel";
import { StageColumnNode } from "@/app/timectx/StageColumn";
import useHandleNodeHooks from "@/app/timectx/hooks/useHandleNodeHooks";
import type { Range } from "react-date-range";

const nodeTypes = {
  customNode: CustomNode,
  column: StageColumnNode,
};
function TripEditor(props: { tripDates: Range }) {
  const {
    saveList,
    nodes,
    addNode,
    edges,
    onNodesChange,
    onEdgesChange,
    updateNodeMetadata,
  } = useHandleNodeHooks(props);
  return (
    <div className="h-[70vh] w-full flex flex-col ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <PanelMenu saveList={saveList} />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TripEditor;
