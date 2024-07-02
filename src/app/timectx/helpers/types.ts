import type { NodeExtend } from "./list";

export interface ListNodePropsLocalStorageSaving {
  startNode: NodeExtend;
  endNode: NodeExtend;
  edges?: NodeExtend[];
}
