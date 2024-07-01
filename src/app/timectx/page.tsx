"use client";
import type React from "react";
import { useEffect } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import DateInput from "./DateInput";
import CustomNode from "./CustomNode";
import { useTimelineContext } from "./Context";
import "reactflow/dist/style.css";
import TimeLineNodeElement from "../timeline/TimelineNodeElement";
import { StageColumnNode } from "./StageColumn";
import AddNodeForm from "./AddNodeElementNode";
import useHandleNodeHooks from "./hooks/useHandleNodeHooks";
import {
  createBaseLineNode,
  createEndNode,
  createStartNode,
} from "./constants/create-node-helpers";

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
  column: StageColumnNode,
};

const App: React.FC = () => {
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodePosition,
  } = useHandleNodeHooks();

  const { startDate, endDate } = useTimelineContext();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const totalDays = endDate.diff(startDate, "day");

    setNodes([
      createStartNode({
        startDate,
        updateNodePosition,
      }),
      // createStartColumnNode({
      //   startDate,
      //   updateNodePosition,
      // }),
      createEndNode({
        startDate,
        updateNodePosition,
      }),
      // createEndColumnNode({
      //   startDate,
      //   updateNodePosition,
      // }),
      // createBaseLineNode(),
    ]);
  }, [startDate, endDate]);
  const addNode = (node: Node) => {
    setNodes((nds) => nds.concat(node));
  };

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-center text-2xl font-bold">Trip Timeline</h1>
      <DateInput />
      <AddNodeForm addNode={addNode} updateNodePosition={updateNodePosition} />
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
  );
};

export default App;
