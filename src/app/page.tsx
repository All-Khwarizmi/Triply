"use client";
import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  type NodeChange,
  type EdgeChange,
  type Edge,
  addEdge,
  type Connection,
} from "reactflow";
import "reactflow/dist/style.css";
const initialEdges: Edge[] = [];
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Welcome" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "Jungle" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    data: { label: "Back" },
    position: { x: 400, y: 125 },
  },
];
function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
