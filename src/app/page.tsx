"use client";

import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
const edges = [
  { id: "1-2", source: "1", target: "2", animated: true, label: "To the" },
  { id: "1-3", source: "1", target: "3", animated: false, label: "And" },
];
const nodes = [
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
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
