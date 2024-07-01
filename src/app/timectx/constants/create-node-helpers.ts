import type { Dayjs } from "dayjs";
import type { Node } from "reactflow";

export type CreateNodeOptions = {
  startDate: Dayjs;
  updateNodePosition: (
    nodeId: string,
    position: {
      x: number;
      y: number;
    }
  ) => void;
};

export function createStartNode(options: CreateNodeOptions): Node {
  return {
    id: "start-node",
    type: "customNode",
    position: { x: 0, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      name: "Start",
      body: "The start of the trip",
      slug: "start-node",
      nodeId: "start-node",
      updateNodePosition: options.updateNodePosition,
      position: { x: 0, y: -125 },
    },
  };
}

export function createEndNode(options: CreateNodeOptions): Node {
  return {
    id: "end-node",
    type: "customNode",
    position: { x: 800, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      name: "End",
      body: "The end of the trip",
      slug: "end-node",
      nodeId: "end-node",
      updateNodePosition: options.updateNodePosition,
      position: { x: 800, y: -125 },
    },
  };
}
