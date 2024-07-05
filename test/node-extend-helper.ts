import type { CreateNodeOptions } from "@/app/timectx/helpers/create-node-helpers";
import type { NodeExtend } from "../src/app/timectx/helpers/list";
import { NodeExtendSchema } from "../src/app/timectx/helpers/schemas";
import type dayjs from "dayjs";

export function createStartNodeExtend(options: CreateNodeOptions): NodeExtend {
  const updateNodeMetadata = options.updateNodeMetadata ?? (() => {});
  const updateNodePosition = options.updateNodePosition ?? (() => {});

  return {
    id: "start-node",
    type: options.type ?? "tripNode",
    position: { x: 0, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      date: options.startDate.format("YYYY-MM-DD"),
      name: "Start",
      body: "The start of the trip",
      slug: "start-node",
      nodeId: "start-node",
      updateNodePosition,
      position: { x: 0, y: -125 },
      prevNode: null,
      nextNode: null,
      dayOfTrip: 1,
      updateNodeMetadata,
      isParent: false,
      typeOfTrip: "trip",
      status: "new",
    },
  };
}

export function createEndNodeExtend(options: CreateNodeOptions): NodeExtend {
  const updateNodeMetadata = options.updateNodeMetadata ?? (() => {});
  const updateNodePosition = options.updateNodePosition ?? (() => {});
  return {
    id: options.id ?? "end-node",
    type: options.type ?? "tripNode",
    position: { x: 800, y: -125 },
    data: {
      label: options.startDate.format("YYYY-MM-DD"),
      date: options.startDate.format("YYYY-MM-DD"),
      name: "End",
      body: "The end of the trip",
      slug: options.id ?? "end-node",
      nodeId: options.id ?? "end-node",
      updateNodePosition,
      position: { x: 2000, y: -133 },
      prevNode: null,
      nextNode: null,
      dayOfTrip: 2,
      updateNodeMetadata,
      isParent: false,
      typeOfTrip: options.typeOfTrip ?? "trip",
      endDate: options.endDate?.format("YYYY-MM-DD"),
      status: "new",
    },
  };
}

export function createNodeExtend(node: dayjs.Dayjs): NodeExtend {
  const id = crypto.randomUUID();
  return {
    id,
    type: "customNode",
    position: { x: 0, y: 0 },
    data: {
      label: node.format("YYYY-MM-DD"),
      date: node.format("YYYY-MM-DD"),
      name: "default",
      body: "Node",
      slug: "node",
      nodeId: id,
      updateNodePosition: () => {},
      position: { x: 0, y: 0 },
      prevNode: null,
      nextNode: null,
      dayOfTrip: 1,
      updateNodeMetadata: () => {},
      isParent: false,
      typeOfTrip: "trip",
      status: "new",
    },
  };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getObjectMethods(obj: any): string[] {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}

export const NODE_Y_POSITIONS = [0, -50, 50];

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

function getRandomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomNodeName() {
  const adjectives = [
    "Beautiful",
    "Cozy",
    "Luxurious",
    "Scenic",
    "Hidden",
    "Charming",
    "Peaceful",
    "Rustic",
    "Enchanting",
    "Historic",
  ];

  const nouns = [
    "Departure",
    "Airport",
    "Flight",
    "Hotel",
    "Inn",
    "Cabin",
    "Lodge",
    "Retreat",
    "Resort",
    "Villa",
    "Bungalow",
    "Cottage",
    "Chalet",
    "Sightseeing",
    "Tour",
    "Beach",
    "Hike",
    "Museum",
    "Park",
    "Dinner",
    "Shopping",
    "Concert",
    "Festival",
    "Event",
    "Spa",
    "Relaxation",
    "Adventure",
    "Exploration",
    "Excursion",
    "Return",
    "Arrival",
    "Homecoming",
  ];

  const complements = [
    "in the Woods",
    "by the Sea",
    "on the Mountain",
    "in the Valley",
    "by the Lake",
    "in the Meadow",
    "on the River",
    "near the Waterfall",
    "in the Forest",
    "at the Beach",
  ];

  const adjective = getRandomElement(adjectives);
  const noun = getRandomElement(nouns);
  const complement = getRandomElement(complements);

  return `${adjective} ${noun} ${complement}`;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isNodeExtend(node: any): node is NodeExtend {
  const isValid = NodeExtendSchema.safeParse(node);
  if (!isValid.success) {
    return false;
  }
  if (node.data.nextNode && !isNodeExtend(node.data.nextNode)) {
    return false;
  }
  if (node.data.prevNode && !isNodeExtend(node.data.prevNode)) {
    return false;
  }
  if (node.data.typeOfTrip === "roadtrip" && !node.data.endDate) {
    return false;
  }
  return true;
}
