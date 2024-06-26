"use client";
import { useState, useCallback, useMemo } from "react";
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
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import TimeLineNode from "./TimeLineNode";
const initialEdges: Edge[] = [];
const initialNodes: Node[] = [
  // {
  //   id: "1",
  //   type: "input",
  //   data: { label: "Welcome" },
  //   position: { x: 250, y: 25 },
  // },
  // {
  //   id: "2",
  //   data: { label: "Jungle" },
  //   position: { x: 100, y: 125 },
  // },
  // {
  //   id: "3",
  //   data: { label: "Back" },
  //   position: { x: 400, y: 125 },
  // },
  // {
  //   id: "node-1",
  //   type: "textUpdater",
  //   position: { x: 0, y: 0 },
  //   data: { value: 123 },
  // },
  {
    id: "node-2",
    type: "timeLine",
    position: { x: 0, y: 0 },
    data: { value: "Timeline" },
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
  const nodeTypes = useMemo(
    () => ({ textUpdater: TextUpdaterNode, timeLine: TimeLineNode }),
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
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
