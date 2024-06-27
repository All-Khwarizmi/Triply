"use client";

import type React from "react";
import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  type NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type Edge,
  type EdgeChange,
  type Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import dayjs, { type Dayjs } from "dayjs";
import "reactflow/dist/style.css";
import BoundaryNode from "./BoundaryNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const getInitialNodes = (): Node[] => {
  const today = dayjs();
  const twoWeeksFromNow = today.add(14, "day");

  return [
    {
      id: "start-node",
      type: "boundaryNode",
      position: { x: 0, y: 0 },
      data: { date: today.format("YYYY-MM-DD") },
    },
    {
      id: "end-node",
      type: "boundaryNode",
      position: { x: 800, y: 0 },
      data: { date: twoWeeksFromNow.format("YYYY-MM-DD") },
    },
  ];
};

const nodeTypes = { boundaryNode: BoundaryNode };

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(getInitialNodes());
  const [edges, setEdges] = useState<Edge[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(14, "day"));

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

  useEffect(() => {
    const startPosition = 0;
    const endPosition = 800; // Assuming a fixed width for simplicity
    const totalDays = endDate.diff(startDate, "day");

    const updatedNodes: Node[] = [
      {
        id: "start-node",
        type: "boundaryNode",
        position: { x: startPosition, y: 0 },
        data: { date: startDate.format("YYYY-MM-DD") },
      },
      {
        id: "end-node",
        type: "boundaryNode",
        position: { x: endPosition, y: 0 },
        data: { date: endDate.format("YYYY-MM-DD") },
      },
    ];

    setNodes(updatedNodes);
  }, [startDate, endDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(dayjs(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(dayjs(e.target.value));
  };

  return (
    <div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      />
      <div className="mt-4">
        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            value={startDate.format("YYYY-MM-DD")}
            onChange={handleStartDateChange}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="block">
          End Date:
          <input
            type="date"
            value={endDate.format("YYYY-MM-DD")}
            onChange={handleEndDateChange}
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div>
    </div>
  );
}

export default Flow;
