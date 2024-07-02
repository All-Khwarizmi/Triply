import type { CreateNodeOptions } from "@/app/timectx/helpers/create-node-helpers";
import type { NodeExtend } from "@/app/timectx/helpers/list";

export function createStartNodeExtend(options: CreateNodeOptions): NodeExtend {
  const updateNodeMetadata = options.updateNodeMetadata ?? (() => {});

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
      dayOfTrip: 1,
      updateNodeMetadata,
    },
  };
}

export function createEndNodeExtend(options: CreateNodeOptions): NodeExtend {
  const updateNodeMetadata = options.updateNodeMetadata ?? (() => {});
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
      position: { x: 2000, y: -133 },
      prevNode: null,
      nextNode: null,
      dayOfTrip: 2,
      updateNodeMetadata,
    },
  };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getObjectMethods(obj: any): string[] {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}

export const NODE_Y_POSITIONS = [0, -250, 250];

export function determineNodeYPosition(yPosA: number, yPosB: number): number {
  const positions = [...NODE_Y_POSITIONS];
  if (yPosA === yPosB) {
    const allowedPositions = positions.filter((pos) => pos !== yPosA);
    if (allowedPositions.length === 0) {
      throw new Error("No available y positions");
    }
    return allowedPositions[0];
  }
  if (!nodeAxisPositionValidation(yPosA, positions)) {
    throw new Error(`Invalid y position for node A: ${yPosA}`);
  }
  if (!nodeAxisPositionValidation(yPosB, positions)) {
    throw new Error(`Invalid y position for node B: ${yPosB}`);
  }
  const allowedPositions = positions.filter(
    (pos) => pos !== yPosA && pos !== yPosB
  );
  if (allowedPositions.length === 0) {
    throw new Error("No available y positions");
  }

  return allowedPositions[0];
}

function nodeAxisPositionValidation(
  axisPos: number,
  allowedPositions: number[]
): boolean {
  return allowedPositions.includes(axisPos);
}
