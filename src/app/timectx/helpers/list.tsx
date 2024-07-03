import dayjs from "dayjs";
import type { Edge, Node } from "reactflow";
import { determineNodeYPosition } from "../../../../test/node-extend-helper";
import type { SaveList } from "./data";
// import { isNodeExtend } from "../../../../test/schemas.spec";
import { EdgeSchema, NodeExtendSchema } from "./schemas";

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
    this.assignDayOfTrip();
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
    const pixelRange = this.traverse().length > 5 ? 3500 : 2000;
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
    this._endNode.data.dayOfTrip = day;
  }

  updateNodeMetadata(
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) {
    let currentNode: NodeExtend | null = this._startNode;
    while (currentNode) {
      if (currentNode.data.nodeId === nodeId) {
        currentNode.data = { ...currentNode.data, ...metadata };
        if (metadata.date) {
          this.orderNodesByDate();
        }
        break;
      }
      currentNode = currentNode.data.nextNode;
    }
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

  resetNextPrevNodes(edges: Edge[]) {
    //  we are restoring the nodes from a saved state and we had to remove the next and prev nodes to save the data (circular reference while stringifying the data), so we need to reassign the next and prev nodes. We do so thanks to the edges data.
    let currentNode: NodeExtend | null = this._startNode;

    do {
      const edge = edges.find(
        (edge) => edge.source === currentNode?.data.nodeId
      );
      if (edge) {
        const nextNode = this.traverse().find(
          (node) => node.data.nodeId === edge.target
        );
        if (nextNode && currentNode) {
          currentNode.data.nextNode = nextNode;
          nextNode.data.prevNode = currentNode;
        }
      }
      if (currentNode) {
        currentNode = currentNode.data.nextNode;
      }
    } while (currentNode?.data.nextNode);
    this._endNode.data.prevNode = currentNode;

    this.updateNodeYPosition();
    this.updateNodeXPosition();

    this.assignDayOfTrip();

    this.updateEdges();
  }

  save(key: string, db: SaveList) {
    const nodes = this.traverse();
    const edges = this.edges;
    const startNode = nodes[0];
    const endNode = nodes[1];
    db.setItem(
      key,
      JSON.stringify({ nodes: removePrevNextNode(nodes), edges })
    );
  }

  static restore(key: string, db: SaveList): NodeList  {
    const data = db.getItem(key);
    if (!data) {
      throw new Error("No data found");
    }
    const { nodes, edges } = JSON.parse(data);
    let isNodesValid = true;
    const parsedNodes: NodeExtend[] = [];
    for (const node of nodes) {
      const validNode = NodeExtendSchema.safeParse(node);
      if (!validNode.success) {
        isNodesValid = false;
        break;
      }
      parsedNodes.push({
        id: validNode.data.id,
        type: validNode.data.type,
        position: validNode.data.position,

        data: {
          prevNode: null,
          nextNode: null,
          updateNodePosition: () => {},
          updateNodeMetadata: () => {},
          position: { x: 0, y: 0 },
          body: validNode.data.data.body,
          date: validNode.data.data.date,
          label: validNode.data.data.label,
          name: validNode.data.data.name,
          slug: validNode.data.data.slug,
          nodeId: validNode.data.data.nodeId,
          dayOfTrip: validNode.data.data.dayOfTrip,
        },
      });
    }
    if (!isNodesValid) {
      throw new Error("Invalid node data");
    }
    let isEdgesValid = true;
    for (const edge of edges) {
      const isEdgeValid = EdgeSchema.safeParse(edge);
      if (!isEdgeValid.success) {
        console.log(isEdgeValid.error.errors);
        isEdgesValid = false;
        break;
      }
    }
    if (!isEdgesValid) {
      throw new Error("Invalid edge data");
    }
    if (nodes.length < 2) {
      throw new Error("Invalid node data");
    }
    // Check for the node with the min and max date to be the start and end node
    const startNode = parsedNodes.reduce((acc, node) => {
      if (dayjs(node.data.date).isBefore(dayjs(acc.data.date))) {
        return node;
      }
      return acc;
    });
    const endNode = parsedNodes.reduce((acc, node) => {
      if (dayjs(node.data.date).isAfter(dayjs(acc.data.date))) {
        return node;
      }
      return acc;
    });
    if (
      !NodeExtendSchema.safeParse(startNode).success ||
      !NodeExtendSchema.safeParse(endNode).success
    ) {
      throw new Error("Invalid start or end node");
    }
    const nodeList = new NodeList(startNode, endNode);
    for (let i = 0; i < nodes.length; i++) {
      if (!nodeList.traverse().find((node) => node.id === nodes[i].id)) {
        nodeList.addNode(parsedNodes[i]);
      }
    }
    nodeList.resetNextPrevNodes(edges);
    return nodeList;
  }
}

// Function to get rid of prevNde and nextNode
export function removePrevNextNode(nodes: NodeExtend[]) {
  return nodes.map((node) => {
    const { prevNode, nextNode, ...rest } = node.data;
    return { ...node, data: rest };
  });
}
