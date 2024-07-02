"use client";
import type React from "react";
import { useEffect } from "react";
import ReactFlow, { type Node, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import DateInput from "./DateInput";
import CustomNode from "./CustomNode";
import { useTimelineContext } from "./Context";
import "reactflow/dist/style.css";
import TimeLineNodeElement from "../timeline/TimelineNodeElement";
import { StageColumnNode } from "./StageColumn";
import AddNodeForm from "./AddNodeElementNode";
import useHandleNodeHooks from "./hooks/useHandleNodeHooks";
import { createEndNode, createStartNode } from "./helpers/create-node-helpers";
import {
  createStartNodeExtend,
  createEndNodeExtend,
} from "../../../test/node-extend-helper";

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
  column: StageColumnNode,
};

const App: React.FC = () => {
  const {
    nodes,
    addNode,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodePosition,
  } = useHandleNodeHooks();

  const { startDate, endDate } = useTimelineContext();



  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-center text-2xl font-bold">Trip Timeline</h1>
      <div
        className="h-full w-full flex "
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        <DateInput />
        <AddNodeForm
          addNode={addNode}
          updateNodePosition={updateNodePosition}
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;
