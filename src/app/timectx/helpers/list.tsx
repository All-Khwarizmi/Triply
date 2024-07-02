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
  updateNodeMetadata: (
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) => void;
  position: { x: number; y: number };
  prevNode: NodeExtend | null;
  nextNode: NodeExtend | null;
}
export interface NodeExtend extends Node {
  data: NodeData;
}

export class NodeList {
  private _startNode: NodeExtend;
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

    this.updateNodeXPosition();
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

  addNode(node: NodeExtend): void {
    let currentNode = this._startNode;
    while (currentNode.data.nextNode) {
      if (dayjs(currentNode.data.nextNode?.data.date).isAfter(node.data.date)) {
        node.data.nextNode = currentNode.data.nextNode;
        currentNode.data.nextNode = node;
        node.data.prevNode = currentNode;
        node.data.nextNode.data.prevNode = node;

        // Update node position
        node.position.y = determineNodeYPosition(
          currentNode.position.y,
          node.data.nextNode.position.y
        );

        this.updateNodeXPosition();
        this.updateEdges();
        break;
      }
      currentNode = currentNode.data.nextNode;
    }
    this.assignDayOfTrip();
  }

  updateNodeYPosition() {
    let currentNode = this._startNode;
    let prevY = currentNode.position.y;
    while (currentNode.data.nextNode) {
      currentNode.position.y = determineNodeYPosition(
        prevY,
        currentNode.data.nextNode.position.y
      );
      prevY = currentNode.position.y;
      currentNode = currentNode.data.nextNode;
    }
    this._endNode.position.y = determineNodeYPosition(
      prevY,
      this._endNode.position.y
    );
  }

  updateNodeXPosition() {
    const pixelRange = this.traverse().length > 5 ? 4000 : 2000;
    const nodes = this.traverse();
    const length = nodes.length;
    const pixelPerDay = pixelRange / length;
    const slots = new Array<number>(length).fill(pixelPerDay);
    for (let x = 1; x < length; x++) {
      slots[x] = slots[x - 1] + slots[x];
    }
    let currentNode = this._startNode;
    while (currentNode.data.nextNode) {
      currentNode.position.x = slots.shift() || 0;
      currentNode.data.position.x = currentNode.position.x;
      currentNode = currentNode.data.nextNode;
    }
    this._endNode.position.x = slots.shift() || 0;
    this.assignDayOfTrip();
  }

  assignDayOfTrip() {
    let currentNode = this._startNode;
    let day = 1;
    while (currentNode.data.nextNode) {
      currentNode.data.dayOfTrip = day;
      currentNode = currentNode.data.nextNode;
      day++;
    }
    this._endNode.data.dayOfTrip = ++day;
  }

  updateNodeMetadata(
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) {
    let currentNode = this._startNode;
    let nodeToUpdate: NodeExtend | null = null;

    // Find the node to update and remove it from the list
    while (currentNode.data.nextNode) {
      if (currentNode.data.nodeId === nodeId) {
        nodeToUpdate = currentNode;
        if (nodeToUpdate.data.prevNode) {
          nodeToUpdate.data.prevNode.data.nextNode = nodeToUpdate.data.nextNode;
        }
        if (nodeToUpdate.data.nextNode) {
          nodeToUpdate.data.nextNode.data.prevNode = nodeToUpdate.data.prevNode;
        }
        if (nodeToUpdate === this._startNode && nodeToUpdate.data.nextNode) {
          this._startNode = nodeToUpdate.data.nextNode;
        }
        break;
      }
      currentNode = currentNode.data.nextNode;
    }

    // Update the node's metadata
    if (nodeToUpdate) {
      nodeToUpdate.data = { ...nodeToUpdate.data, ...metadata };
      // Reinsert the node into the correct position
      this.addNode(nodeToUpdate);
    }

    // Ensure nodes are ordered correctly
    this.orderNodesByDate();
  }

  orderNodesByDate() {
    const nodes = this.traverse();
    nodes.sort((a, b) => dayjs(a.data.date).unix() - dayjs(b.data.date).unix());

    // Update linked list pointers
    this._startNode = nodes[0];
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].data.nextNode = nodes[i + 1];
      nodes[i + 1].data.prevNode = nodes[i];
    }
    nodes[nodes.length - 1].data.nextNode = null;

    // Update positions and edges
    this.updateNodeXPosition();
    this.updateEdges();
  }

  updateEdges() {
    const newEdges: Edge[] = [];
    let currentNode = this._startNode;
    while (currentNode.data.nextNode) {
      newEdges.push({
        id: `${currentNode.data.nodeId}-${currentNode.data.nextNode.data.nodeId}`,
        source: currentNode.data.nodeId,
        target: currentNode.data.nextNode.data.nodeId,
      });
      currentNode = currentNode.data.nextNode;
    }
    this._edges = newEdges;
  }
}
