import type { CreateNodeOptions } from "@/app/timectx/helpers/create-node-helpers";
import type { NodeExtend } from "@/app/timectx/helpers/list";

export function createStartNodeExtend(options: CreateNodeOptions): NodeExtend {
  return {
    id: "start-node",
    type: "customNode",
    position: { x: 0, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      date: options.startDate.format("YYYY-MM-DD"),
      name: "Start",
      body: "The start of the trip",
      slug: "start-node",
      nodeId: "start-node",
      updateNodePosition: options.updateNodePosition,
      position: { x: 0, y: -125 },
      prevNode: null,
      nextNode: null,
    },
  };
}

export function createEndNodeExtend(options: CreateNodeOptions): NodeExtend {
  return {
    id: options.id ?? "end-node",
    type: "customNode",
    position: { x: 800, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      date: options.startDate.format("YYYY-MM-DD"),
      name: "End",
      body: "The end of the trip",
      slug: options.id ?? "end-node",
      nodeId: options.id ?? "end-node",
      updateNodePosition: options.updateNodePosition,
      position: { x: 800, y: -133 },
      prevNode: null,
      nextNode: null,
    },
  };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getObjectMethods(obj: any): string[] {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}
