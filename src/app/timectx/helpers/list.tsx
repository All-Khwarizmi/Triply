import dayjs from "dayjs";
import type { Edge, Node } from "reactflow";
import { determineNodeYPosition } from "../../../../test/node-extend-helper";

export interface NodeData {
  label: string;
  date: string;
  name: string;
  body: string;
  slug: string;
  nodeId: string;
  dayOfTrip: number;
  updateNodePosition: (
    nodeId: string,
    position: { x: number; y: number }
  ) => void;
  position: { x: number; y: number };
  prevNode: NodeExtend | null;
  nextNode: NodeExtend | null;
}
export interface NodeExtend extends Node {
  data: {
    label: string;
    date: string;
    name: string;
    body: string;
    slug: string;
    nodeId: string;
    dayOfTrip: number;
    updateNodePosition: (
      nodeId: string,
      position: { x: number; y: number }
    ) => void;
    position: { x: number; y: number };
    prevNode: NodeExtend | null;
    nextNode: NodeExtend | null;
  };
}

export class NodeList {
  private readonly _startNode: NodeExtend;
  private readonly _endNode: NodeExtend;
  private _edges: Edge[] = [];

  constructor(startNode: NodeExtend, endNode: NodeExtend) {
    this._startNode = startNode;

    this._startNode.position = { x: this._startNode.position.x, y: 0 };
    this._startNode.data.position = { x: this._startNode.position.x, y: 0 };
    this._endNode = endNode;
    this._endNode.position = { x: this._endNode.position.x, y: -250 };
    this._endNode.data.position = { x: this._endNode.position.x, y: -250 };

    this._startNode.data.nextNode = this._endNode;
    this._endNode.data.prevNode = this._startNode;

    this._edges.push({
      id: `${this._startNode.data.nodeId}-${this._endNode.data.nodeId}`,
      target: this._endNode.data.nodeId,
      source: this._startNode.data.nodeId,
    });
  }

  get nodes(): NodeExtend[] {
    return [this._startNode, this._endNode];
  }

  traverse(): NodeExtend[] {
    const nodes: NodeExtend[] = [];

    let currentNode = this._startNode;
    while (currentNode.data.nextNode) {
      nodes.push(currentNode);
      currentNode = currentNode.data.nextNode;
    }
    nodes.push(this._endNode);
    return nodes;
  }

  get edges(): Edge[] {
    return this._edges;
  }

  findNode(node: NodeExtend) {}

  addNode(node: NodeExtend): void {
    let currentNode = this._startNode;
    while (currentNode.data.nextNode) {
      if (dayjs(currentNode.data.nextNode?.data.date).isAfter(node.data.date)) {
        node.data.nextNode = currentNode.data.nextNode;
        currentNode.data.nextNode = node;

        // update node position
        node.position.y = determineNodeYPosition(
          currentNode.position.y,
          node.data.nextNode.position.y
        );
        this.updateNodeXPosition();
        // Update edges
        const newEdges: Edge[] = [];
        for (const edge of this._edges) {
          if (
            edge.source === currentNode.id &&
            edge.target === node.data.nextNode.id
          ) {
            const updateEdge = edge;

            updateEdge.id = `${currentNode.data.nodeId}-${node.data.nodeId}`;
            updateEdge.target = node.data.nodeId;

            newEdges.push({
              id: `${node.id}-${node.data.nextNode.id}`,
              source: node.id,
              target: node.data.nextNode.id,
            });
          }
          newEdges.push(edge);
        }
        this._edges = newEdges;

        break;
      }
      currentNode = currentNode.data.nextNode;
    }
  }

  updateNodeXPosition() {
    let pixelRange = 1000;
    const nodes = this.traverse();
    const length = nodes.length;
    if (nodes.length > 5) {
      pixelRange = 2000;
    }

    const pixelPerDay = pixelRange / length;
    const slots = new Array<number>(length).fill(pixelPerDay);
    for (let x = 0; x < length; x++) {
      if (x === 0) {
        continue;
      }
      slots[x] = slots[x - 1] + slots[x];
    }
    let currentNode = this._startNode;
    let day = 1;
    while (currentNode.data.nextNode) {
      currentNode.position.x = slots.shift() || 0;
      currentNode.data.position.x = currentNode.position.x;
      currentNode = currentNode.data.nextNode;
      currentNode.data.dayOfTrip = day;
      day++;
    }
    this._endNode.position.x = slots.shift() || 0;
  }
}
