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
import "reactflow/dist/style.css";

// Custom hook template
const useHandleNodeHooks = () => {
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

  function updateNodePosition(
    nodeId: string,
    position: { x: number; y: number }
  ) {
    // Implement the logic to update the position of the node
    console.log("Updating node with id:", nodeId);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          console.log("Updating node with id:", nodeId);
          console.log("Position:", position);
          return {
            ...node,
            position: {
              ...position,
              y: position.y,
            },
          };
        }
        return node;
      })
    );
  }
  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodePosition,
  };
};

export default useHandleNodeHooks;