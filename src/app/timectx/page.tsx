"use client";
import type React from "react";
import { useCallback, useState, useEffect } from "react";
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
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodePosition,
  } = useHandleNodeHooks();

  const { startDate, endDate } = useTimelineContext();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const totalDays = endDate.diff(startDate, "day");

    const startCulmnNode: Node = {
      id: "start-column-node",
      type: "column",
      position: { x: 52, y: -60 },
      data: {
        label: startDate.format("YYYY-MM-DD"),
        name: "Start",
        body: "The start of the trip",
        slug: "start-node",
        nodeId: "start-column-node",
      },
    };
    const endColumnNode: Node = {
      id: "end-column-node",
      type: "column",
      position: { x: 852, y: -60 },
      data: {
        label: startDate.format("YYYY-MM-DD"),
        name: "End",
        body: "The end of the trip",
        slug: "end-node",
        nodeId: "end-column-node",
      },
    };

    const baseLine: Node = {
      id: "node-2",
      type: "timeline",
      position: { x: 0, y: 0 },
      data: {
        value: "Timeline",
        label: "Timeline",
        name: "Timeline",
        body: "The timeline of the trip",
        slug: "node-2",
        nodeId: "node-2",
      },
    };
    setNodes([
      createStartNode({
        startDate,
        updateNodePosition,
      }),
      createEndNode({
        startDate,
        updateNodePosition,
      }),
      baseLine,
      startCulmnNode,
      endColumnNode,
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
        onConnect={onConnect}
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
