import { useCallback, useState, useEffect, use, useRef } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "reactflow/dist/style.css";
import type { NodeExtend } from "../helpers/list";
import { NodeList } from "../helpers/list";
import dayjs from "dayjs";
import { createStartNodeExtend } from "../../../../test/node-extend-helper";
import { createEndNode } from "../helpers/create-node-helpers";
const list = new NodeList(
  createStartNodeExtend({
    startDate: dayjs(new Date()),
    updateNodePosition: () => {},
  }),
  createEndNode({
    startDate: dayjs(new Date()).add(14, "day"),
    updateNodePosition: () => {},
  })
);
// Custom hook template
const useHandleNodeHooks = () => {
  const listRef = useRef(list);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    listRef.current = list;
  }, [list.traverse()]);
  console.log(list);
  const [nodes, setNodes] = useState<NodeExtend[]>(() => list.traverse());
  const [edges, setEdges] = useState<Edge[]>(list.edges);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [list.traverse()]
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
    list.addNode(node);
    setNodes(list.traverse());
    setEdges(list.edges);
    console.log(list);
  }
  return {
    addNode,
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
