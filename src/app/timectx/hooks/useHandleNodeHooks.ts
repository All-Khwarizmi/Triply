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
  const [edges, setEdges] = useState<Edge[]>([
    {
      id: "edge-1",
      source: "start-node",
      target: "end-node",
      type: "smoothstep",
    },
  ]);

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
    setNodes((nds) => {
      const newNodes = nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            position: {
              ...position,
              y: position.y,
            },
          };
        }
        return node;
      });

      return newNodes;
    });
  }
  // Should take a new node and insert it into the nodes array. Should check the date of the node and insert it in the correct position. Also should update the edges array to reflect the new node. Also should take care of the position of the new node so that it is placed in the correct position regarding the other nodes.
  function addNode(node: Node) {
    if (nodes.length < 2) {
      throw new Error(
        "The timeline should have at least two nodes to add a new node."
      );
    }
    // Check the position of the last node before the new one (by date). We take the index for reference.
    const lastNodeIndex = nodes.findIndex((n) => n.data.date > node.data.date);
    // If the last node is the start node, we insert the new node after it.
    if (lastNodeIndex === -1) {
      throw new Error(
        "The new node date is not set properly or there are not nodes in the timeline."
      );
    }
    if (lastNodeIndex === 0) {
      throw new Error(
        "The new node date is not set properly or there are not nodes in the timeline."
      );
    }
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
