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

export function createStartColumnNode(options: CreateNodeOptions): Node {
  return {
    id: "start-column-node",
    type: "column",
    position: { x: 52, y: -60 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      name: "Start",
      body: "The start of the trip",
      slug: "start-node",
      nodeId: "start-column-node",
    },
  };
}

export function createEndColumnNode(options: CreateNodeOptions): Node {
  return {
    id: "end-column-node",
    type: "column",
    position: { x: 852, y: -60 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      name: "End",
      body: "The end of the trip",
      slug: "end-node",
      nodeId: "end-column-node",
    },
  };
}


export function createBaseLineNode(): Node {
  return {
    id: "base-line-node",
    type: "timeline",
    position: { x: 0, y: 0 },
    data: {
      value: "Timeline",
      label: "Timeline",
      name: "Timeline",
      body: "The timeline of the trip",
      slug: "node-2",
      nodeId: "node-2",
    },
  };
}
