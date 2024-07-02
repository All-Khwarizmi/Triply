import { expect, test, describe } from "vitest";
import dayjs from "dayjs";
import { NodeList } from "../src/app/timectx/helpers/list";
import {
  createEndNodeExtend,
  createStartNodeExtend,
  getObjectMethods,
} from "./node-extend-helper";
import type { Edge } from "reactflow";

describe("ListNode start state", () => {
  const startNode = createStartNodeExtend({
    startDate: dayjs(new Date()),
    updateNodePosition: () => {},
  });
  const endNode = createEndNodeExtend({
    startDate: dayjs(new Date()).add(7, "day"),
    updateNodePosition: () => {},
  });
  const startEdge: Edge = {
    id: `${startNode.data.nodeId}-${endNode.data.nodeId}`,
    source: startNode.data.nodeId,
    target: endNode.data.nodeId,
  };
  const nodeList = new NodeList(startNode, endNode);
  test("should have a method to get nodes", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("nodes");
  });
  test("should be instantiated with a start and end node", () => {
    expect(nodeList.nodes).toEqual([startNode, endNode]);
  });

  test("nextNode of start node should be null and next to be endNode ", () => {
    expect(nodeList.nodes[0].data.prevNode).toBe(null);
    expect(nodeList.nodes[0].data.nextNode).toEqual(endNode);
  });
  test("prevNode of end node should be null and prev to be startNode ", () => {
    expect(nodeList.nodes[1].data.prevNode).toEqual(startNode);
    expect(nodeList.nodes[1].data.nextNode).toBe(null);
  });

  test("should have a method to get edges", () => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(nodeList));
    expect(methods).toContain("edges");
  });

  test("should return an array of edges containing the start  between the start and the end node", () => {
    const edges = nodeList.edges;
    expect(edges[0]).toStrictEqual(startEdge);
  });

  test("should have a method to traverse all the nodes and return them", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("traverse");
  });

  test("the traverse method should return an array with a start and end node", () => {
    const nodes = nodeList.traverse();
    expect(nodes.find((e) => e.id === "start-node")).toBeDefined();
    expect(nodes.find((e) => e.id === "end-node")).toBeDefined();
  });

  //   test("should have a method to find a node", () => {
  //     const methods = getObjectMethods(nodeList);
  //     expect(methods).toContain("findNode");
  //   });

  //   test("should return a node if it is in the list", () => {});

  test("should have a method to add a node", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("addNode");
  });

  test("should add a node to the list and update the edges", () => {
    const node = createEndNodeExtend({
      id: "node-42",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node);
    const searchNode = nodeList.traverse().find((e) => {
      return e.id === node.id;
    });
    expect(searchNode).toBeTruthy();
    const edges = nodeList.edges;
    const edge = edges.find((e) => e.id === `${startNode.id}-${node.id}`);
    expect(edge).toBeDefined();

    const edge2 = edges.find((e) => e.id === `${node.id}-${endNode.id}`);
    expect(edge2).toBeDefined();
  });

  // Test to add plenty of nodes and check if the edges are correct
  test("should be able to add multiple nodes to the list and update the edges", () => {
    const node43 = createEndNodeExtend({
      id: "node-43",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node43);
    const node44 = createEndNodeExtend({
      id: "node-44",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node44);
    const edges = nodeList.edges;
    const edge = edges.find((e) => e.id === `${node43.id}-${node44.id}`);
    expect(edge).toBeDefined();
    const edge2 = edges.find((e) => e.id === `${node44.id}-${endNode.id}`);
    expect(edge2).toBeDefined();
  });
});

describe("ListNode update node position", () => {
  const startNode = createStartNodeExtend({
    startDate: dayjs(new Date()),
    updateNodePosition: () => {},
  });
  const endNode = createEndNodeExtend({
    startDate: dayjs(new Date()).add(7, "day"),
    updateNodePosition: () => {},
  });
  const startEdge: Edge = {
    id: `${startNode.data.nodeId}-${endNode.data.nodeId}`,
    source: startNode.data.nodeId,
    target: endNode.data.nodeId,
  };
  const nodeList = new NodeList(startNode, endNode);
  test("should have a method to updatePosition", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("updateNodePosition");
  });

  const NODE_Y_POSITIONS = [0, -250, 250];

  test("Each node should have any of the Y positions", () => {
    // const node = createEndNodeExtend({
    //   id: "node-42",
    //   startDate: dayjs(new Date()).add(3, "day"),
    //   updateNodePosition: () => {},
    // });
    // nodeList.addNode(node);
    const nodes = nodeList.traverse();
    for (const node of nodes) {
      console.log(node.position.y);
      expect(NODE_Y_POSITIONS).toContain(node.position.y);
    }
  });

  // test("should not be two consecutives nodes on the same Y axis plan", () => {
  //   const node = createEndNodeExtend({
  //     id: "node-42",
  //     startDate: dayjs(new Date()).add(3, "day"),
  //     updateNodePosition: () => {},
  //   });
  //   nodeList.addNode(node);
  //   const nodes = nodeList.traverse();
  //   let prevY = nodes[0].position.y;
  //   for (let i = 1; i < nodes.length; i++) {
  //     expect(nodes[i].position.y).not.toBe(prevY);
  //     prevY = nodes[i].position.y;
  //   }
  // });
});
