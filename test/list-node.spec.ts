import { expect, test, describe, it } from "vitest";
import dayjs from "dayjs";
import { NodeList } from "../src/app/timectx/helpers/list";
import {
  NODE_Y_POSITIONS,
  createEndNodeExtend,
  createStartNodeExtend,
  getObjectMethods,
} from "./node-extend-helper";
import type { Edge } from "reactflow";
import { Database } from "../src/app/timectx/helpers/data";
import { ListNodeDatabaseSchema } from "../src/app/timectx/helpers/schemas";

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
  test("should have a method to update node position", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("updateNodeYPosition");
  });

  test("Each node should have any of the Y positions", () => {
    const nodes = nodeList.traverse();
    for (const node of nodes) {
      expect(NODE_Y_POSITIONS).toContain(node.position.y);
    }
    const node = createEndNodeExtend({
      id: "node-42",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node);
    const nodesII = nodeList.traverse();

    for (const node of nodesII) {
      expect(NODE_Y_POSITIONS).toContain(node.position.y);
    }
  });

  test("should not be two consecutives nodes on the same Y axis plan", () => {
    const nodes = nodeList.traverse();
    let prevY = nodes[0].position.y;
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].position.y).not.toBe(prevY);
      prevY = nodes[i].position.y;
    }
  });
  test("should have a method to updatePosition", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("updateNodeXPosition");
  });

  test("Each node should be spread on the X axis and be separated by at least 200px", () => {
    const nodes = nodeList.traverse();
    let prevX = nodes[0].position.x;
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].position.x - prevX).toBeGreaterThanOrEqual(200);
      prevX = nodes[i].position.x;
    }
  });
  test("should have a method assign day of the trip", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("assignDayOfTrip");
  });
  test("each node should have a day of the trip in ascendant order", () => {
    const nodes = nodeList.traverse();

    let prevDate = nodes[0].data.dayOfTrip;
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].data.dayOfTrip).toBeGreaterThan(prevDate);
      prevDate = nodes[i].data.dayOfTrip;
    }
  });
});

describe("Should be able to update the node metadata", () => {
  const startNode = createStartNodeExtend({
    startDate: dayjs(new Date()),
    updateNodePosition: () => {},
  });
  const endNode = createEndNodeExtend({
    startDate: dayjs(new Date()).add(7, "day"),
    updateNodePosition: () => {},
  });

  const nodeList = new NodeList(startNode, endNode);

  test("should have a method to update node metadata", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("updateNodeMetadata");
  });

  test("should update the node metadata", () => {
    const node = createEndNodeExtend({
      id: "node-42",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node);
    nodeList.updateNodeMetadata(node.id, {
      body: "body",
    });
    const nodes = nodeList.traverse();
    const searchNode = nodes.find((e) => e.id === node.id);
    expect(searchNode?.data.body).toBe("body");
  });

  test("should be able to update the name of the node", () => {
    const node = createEndNodeExtend({
      id: "node-42",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    nodeList.addNode(node);
    nodeList.updateNodeMetadata(node.id, {
      name: "name",
    });
    const nodes = nodeList.traverse();
    const searchNode = nodes.find((e) => e.id === node.id);
    expect(searchNode?.data.name).toBe("name");
  });

  test("should preserve the order of the nodes (by date) after a date change", () => {
    const date = dayjs(new Date());
    const dayUpdate = date.add(4, "day");
    const node = createEndNodeExtend({
      id: "node-50",
      startDate: date,
      updateNodePosition: () => {},
    });
    nodeList.addNode(node);

    nodeList.updateNodeMetadata(node.id, {
      date: dayUpdate.toString(),
    });

    const nodes = nodeList.traverse();
    const searchNode = nodes.find((e) => e.id === node.id);
    expect(searchNode?.data.date).toEqual(dayUpdate.toString());

    // Check if nodes are in correct order by date
    let prevDate = nodes[0].data.date;
    for (let i = 1; i < nodes.length; i++) {
      // log the date to check if it is in order
      const isAfterOrSame =
        dayjs(nodes[i].data.date).isAfter(prevDate) ||
        dayjs(nodes[i].data.date).isSame(prevDate);

      expect(isAfterOrSame).toBe(true);
      prevDate = nodes[i].data.date;
    }

    // Check if nodes are in correct order by position
    let prevX = nodes[0].position.x;
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].position.x).toBeGreaterThan(prevX);
      prevX = nodes[i].position.x;
    }

    // Check if nodes are in correct order by day of the trip
    let prevDay = nodes[0].data.dayOfTrip;
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].data.dayOfTrip).toBeGreaterThan(prevDay);
      prevDay = nodes[i].data.dayOfTrip;
    }

    // Check if edges are correct
    const edges = nodeList.edges;
    for (let i = 0; i < edges.length - 1; i++) {
      expect(edges[i].source).toBe(nodes[i].id);
      expect(edges[i].target).toBe(nodes[i + 1].id);
    }
  });
});

describe("Save and restore", () => {
  const startNode = createEndNodeExtend({
    id: "node-1",
    startDate: dayjs(new Date()),
    updateNodePosition: () => {},
  });
  const endNode = createEndNodeExtend({
    id: "node-2",
    startDate: dayjs(new Date()).add(7, "day"),
    updateNodePosition: () => {},
  });
  const nodeList = new NodeList(startNode, endNode);
  test("should have a method to save the state", () => {
    const methods = getObjectMethods(nodeList);
    expect(methods).toContain("save");
  });

  test("Saving the state should save the state as an object in the database passed as parameter", () => {
    const database = new Database();
    const databaseKey = "triply";
    nodeList.save(databaseKey, database);
    const item = database.getItem(databaseKey);
    expect(item).not.to.toBeNull();

    const parsedItem = ListNodeDatabaseSchema.safeParse(
      JSON.parse(item as string)
    );
    expect(parsedItem.success).toBe(true);
  });

  test("Restoring the state should restore the state from the database", () => {
    const database = new Database();
    const databaseKey = "triply";
    nodeList.save(databaseKey, database);
    const nodesFromDb = database.getItem(databaseKey);
    expect(nodesFromDb).not.toBeUndefined();
    expect(nodesFromDb).not.toBeNull();
    const { nodes, edges } = JSON.parse(nodesFromDb as string);
    expect(nodes).not.toBeUndefined();
    expect(edges).not.toBeUndefined();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isNodeOne = nodes.find((e: any) => e.id === "node-1");
    expect(isNodeOne).not.toBeUndefined();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isNodeTwo = nodes.find((e: any) => e.id === "node-2");

    expect(isNodeTwo).not.toBeUndefined();

    const nodeListRestored = NodeList.restore(databaseKey, database);
    const restoredNodes = nodeListRestored?.traverse();
    const restoredEdges = nodeListRestored?.edges;
    expect(restoredNodes).not.toBeUndefined();
    expect(restoredEdges).not.toBeUndefined();
    if (!restoredNodes || !restoredEdges) {
      return;
    }

    expect(restoredNodes[0].id).toStrictEqual("node-1");
    expect(restoredNodes[1].id).toStrictEqual("node-2");
    expect(restoredEdges[0].id).toStrictEqual("node-1-node-2");
  });
});
