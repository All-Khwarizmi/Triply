import { expect, test, describe } from "vitest";
import { getObjectMethods } from "./node-extend-helper";

describe("Object methods", () => {
  test("should return an array of object methods", () => {
    class Test {
      method() {}
    }
    const test = new Test();

    console.log(getObjectMethods(test));
    expect(getObjectMethods(test)).toContain("method");
  });
});
