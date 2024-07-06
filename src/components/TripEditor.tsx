"use client";
import React, { type PropsWithRef } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/components/CustomNode";
import PanelMenu from "@/components/Panel";
import useHandleNodeHooks from "@/hooks/useHandleNodeHooks";
import type { Range } from "react-date-range";
import TripNode from "./TripNode";
import RoadTripNode from "./RoadTripNode";

export interface TripEditorProps {
  tripDates: Range;
}
const nodeTypes = {
  customNode: CustomNode,
  tripNode: TripNode,
  roadtrip: RoadTripNode,
};
function TripEditor(props: PropsWithRef<TripEditorProps>) {
  const {
    saveList,
    nodes,
    addNode,
    addChildNode,
    removeChildNode,
    updateChildNode,
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
        <PanelMenu
          saveList={saveList}
          updateChildNode={updateChildNode}
          removeChildNode={removeChildNode}
          addChildNode={addChildNode}
          addNode={addNode}
          updateNodeMetadata={updateNodeMetadata}
        />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TripEditor;
