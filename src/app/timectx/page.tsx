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
import Timeline from "./Timeline";
import DateInput from "./DateInput";
import CustomNode from "./CustomNode";
import { TimelineProvider, useTimelineContext } from "./Context";
import TimeLineNode from "../TimeLineNode";
import "reactflow/dist/style.css";
import TimeLineNodeElement from "../timeline/TimelineNodeElement";
import { StageColumnNode } from "./StageColumn";
const rfStyle = {
  //   backgroundColor: "#B8CEFF",
};

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
  column: StageColumnNode,
};

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const { startDate, endDate } = useTimelineContext();
  useEffect(() => {
    const totalDays = endDate.diff(startDate, "day");
    const startNode: Node = {
      id: "start-node",
      type: "customNode",
      position: { x: 0, y: -100 },
      data: { label: startDate.format("YYYY-MM-DD") },
    };
    const startCulmnNode: Node = {
      id: "start-column-node",
      type: "column",
      position: { x: 40, y: -60 },
      data: { label: startDate.format("YYYY-MM-DD") },
    };
    const endColumnNode: Node = {
      id: "end-column-node",
      type: "column",
      position: { x: 840, y: -60 },
      data: { label: startDate.format("YYYY-MM-DD") },
    };
    const endNode: Node = {
      id: "end-node",
      type: "customNode",
      position: { x: 800, y: -100 },
      data: { label: endDate.format("YYYY-MM-DD") },
    };
    const baseLine: Node = {
      id: "node-2",
      type: "timeline",
      position: { x: 0, y: 0 },
      data: { value: "Timeline" },
    };
    setNodes([startNode, endNode, baseLine, startCulmnNode, endColumnNode]);
  }, [startDate, endDate]);

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-center text-2xl font-bold">Trip Timeline</h1>
      {/* <Timeline /> */}
      <DateInput />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        // style={rfStyle}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default App;
