import { useCallback, useEffect, useState } from "react";
import {
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
import type { NodeData, NodeExtend } from "../helpers/list";
import { NodeList } from "../helpers/list";
import dayjs from "dayjs";
import {
  createEndNodeExtend,
  createStartNodeExtend,
} from "../../../../test/node-extend-helper";
import { useReactFlow } from "reactflow";
import type { Range } from "react-date-range";
let list: NodeList;

// Custom hook template
const useHandleNodeHooks = (options: { tripDates: Range }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useState<NodeExtend[]>(() => list?.traverse());
  const [edges, setEdges] = useState<Edge[]>(list?.edges);
  function updateNodeMetadata(
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) {
    console.log("Updating node metadata", { nodeId, metadata });
    list.updateNodeMetadata(nodeId, metadata);

    console.log(list.traverse());
    setNodes(list.traverse());
    setEdges(list.edges);
  }

  useEffect(() => {
    let nodeListFromStorage: NodeList | null = null;
    try {
      nodeListFromStorage = NodeList.restore("triply", localStorage);
    } catch (error) {
      console.error("Error restoring from storage", error);
    }
    if (nodeListFromStorage) {
      console.log("Restoring from storage");

      console.log(nodeListFromStorage.traverse());
      list = nodeListFromStorage;
      // Reassign updateNodePosition and updateNodeMetadata functions
      // biome-ignore lint/complexity/noForEach: <explanation>
      list.traverse().forEach((node) => {
        node.data.updateNodePosition = updateNodePosition;
        node.data.updateNodeMetadata = updateNodeMetadata;
      });
      setNodes(list.traverse());
      setEdges(list.edges);
    } else {
      list = new NodeList(
        createStartNodeExtend({
          startDate: dayjs(options.tripDates.startDate),
          updateNodePosition: () => {},
          updateNodeMetadata,
        }),
        createEndNodeExtend({
          startDate: dayjs(options.tripDates.endDate),
          updateNodePosition: () => {},
          updateNodeMetadata,
        })
      );
      setNodes(list.traverse());
      setEdges(list.edges);
    }
  }, [options]);

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
  function addNode(node: NodeExtend) {
    list.addNode(node);
    setNodes(list.traverse());
    setEdges(list.edges);
    fitView();
  }

  function saveList() {
    list.save("triply", localStorage);
  }

  return {
    saveList,
    updateNodeMetadata,
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
