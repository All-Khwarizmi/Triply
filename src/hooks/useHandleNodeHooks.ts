import { use, useCallback, useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";
import {
  createEndNodeExtend,
  createStartNodeExtend,
} from "../../test/node-extend-helper";
import { useReactFlow } from "reactflow";
import type { Range } from "react-date-range";
import type { NodeExtend, NodeData } from "@/utils/list";
import { NodeList } from "@/utils/list";
import { setItem } from "@/actions/set-item";
let list: NodeList;

const useHandleNodeHooks = (options: {
  tripDates: Range;
  nodeList?: NodeList;
}) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useState<NodeExtend[]>(() => list?.traverse());
  const [edges, setEdges] = useState<Edge[]>(list?.edges);
  const memoEdges = useMemo(() => edges, [edges]);
  function updateNodeMetadata(
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date" | "status">
    >
  ) {
    list.updateNodeMetadata(nodeId, metadata);
    setNodes(list.traverse());
    setEdges(list.edges);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (options.nodeList) {
      list = options.nodeList;
    } else {
      list = new NodeList(
        createStartNodeExtend({
          startDate: dayjs(options.tripDates.startDate),
          updateNodePosition: () => {},
          updateNodeMetadata,
          removeNode,
        }),
        createEndNodeExtend({
          startDate: dayjs(options.tripDates.endDate),
          updateNodePosition: () => {},
          updateNodeMetadata,
          removeNode,
        })
      );
    }
    setNodes(list.traverse());
    setEdges(list.edges);
  }, []);

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

  function addChildNode(parentNodeId: string, node: NodeExtend) {
    list.addChildNode(parentNodeId, node);
    setNodes(list.traverse());
    setEdges(list.edges);
    fitView();
  }
  function removeChildNode(parentNodeId: string, childNodeId: string) {
    list.removeChildNode(parentNodeId, childNodeId);
    setNodes(list.traverse());
    setEdges(list.edges);
    fitView();
  }
  function updateChildNode(
    parentNodeId: string,
    childNodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) {
    list.updateChildNode(parentNodeId, childNodeId, metadata);
    setNodes(list.traverse());
    setEdges(list.edges);
    fitView();
  }
  function saveList(tripName?: string) {
    list.save(tripName ?? "triply", localStorage);
  }
  function removeNode(nodeId: string) {
    list.removeNode(nodeId);
    setNodes(list.traverse());
    setEdges(list.edges);
    fitView();
  }

  async function shareTrip() {
    const item = list.save("triply", localStorage);
    const id = await setItem(item.key, item.value);
    return id;
  }

  return {
    shareTrip,
    removeNode,
    saveList,
    updateNodeMetadata,
    addNode,
    addChildNode,
    removeChildNode,
    updateChildNode,
    nodes,
    setNodes,
    edges: memoEdges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodePosition,
  };
};

export default useHandleNodeHooks;
