import dayjs from "dayjs";
import { expect, test, describe } from "vitest";
import { createEndNodeExtend } from "./node-extend-helper";
import { NodeExtendSchema } from "../src/app/timectx/helpers/schemas";
import type { NodeExtend } from "../src/app/timectx/helpers/list";

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

describe("List schemas", () => {
  test("should be able to parse a valid NodeExtend", () => {
    const node = createEndNodeExtend({
      id: "node-42",
      startDate: dayjs(new Date()).add(3, "day"),
      updateNodePosition: () => {},
    });
    const nodeTwo = createEndNodeExtend({
      id: "node-43",
      startDate: dayjs(new Date()).add(4, "day"),
      updateNodePosition: () => {},
    });
    const fullNode: NodeExtend = {
      ...node,
      data: {
        ...node.data,
        nextNode: nodeTwo,
        prevNode: node,
      },
    };
    const isValid = NodeExtendSchema.safeParse(node);
    if (!isValid.success) {
      console.error(isValid.error.errors);
    }
    expect(isNodeExtend(node)).toBeTruthy();
    expect(isNodeExtend(nodeTwo)).toBeTruthy();
    expect(isNodeExtend(fullNode)).toBeTruthy();
  });
});

test("should first", () => {
  expect(true).toBeTruthy();
});
