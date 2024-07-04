"use client";
import type React from "react";
import ReactFlow, { Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import "reactflow/dist/style.css";
import DrawerMenu from "@/components/ui/DrawerMenu";
import Header from "@/components/ui/Header";
import CustomNode from "@/app/timectx/CustomNode";
import PanelMenu from "@/app/timectx/Panel";
import { StageColumnNode } from "@/app/timectx/StageColumn";
import useHandleNodeHooks from "@/app/timectx/hooks/useHandleNodeHooks";
import TimeLineNodeElement from "@/app/timeline/TimelineNodeElement";
import type { Range } from "react-date-range";

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
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
    <div className="h-full w-full flex flex-col ">
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
