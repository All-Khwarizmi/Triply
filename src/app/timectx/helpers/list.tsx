import dayjs from "dayjs";
import type { Edge, Node } from "reactflow";
import { determineNodeYPosition } from "../../../../test/node-extend-helper";

export interface NodeExtend extends Node {
  data: {
    label: string;
    date: string;
    name: string;
    body: string;
    slug: string;
    nodeId: string;
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
    console.log(this._startNode.position);
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
        const currentNodeYPossition = currentNode.position.y;
        const afterNextNodeYPosition = node.data.nextNode.position.y;
        const newYpos = determineNodeYPosition(
          currentNodeYPossition,
          afterNextNodeYPosition
        );
        node.position.y = newYpos;

        // Update edges
        const newEdges: Edge[] = [];
        // console.log(this._edges);
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

  updateNodePosition() {}
}
