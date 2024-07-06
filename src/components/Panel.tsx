import AddRoadtripButton from "@/components/AddRoadtripButton";
import type { NodeData, NodeExtend } from "@/utils/list";
import React from "react";
import { useReactFlow, Panel } from "reactflow";
import AddTripButton from "./AddTripButton";
import SaveTripButton from "./SaveTripButton";
import Link from "next/link";

interface PanelMenuProps {
  saveList: () => void;
  updateChildNode: (
    parentNodeId: string,
    childNodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) => void;
  updateNodeMetadata: (
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) => void;
  removeChildNode: (parentNodeId: string, childNodeId: string) => void;
  addChildNode: (parentNodeId: string, node: NodeExtend) => void;
  addNode: (node: NodeExtend) => void;
  removeNode: (nodeId: string) => void;
}
function PanelMenu(props: PanelMenuProps) {
  const { zoomIn, zoomOut, setCenter, fitView } = useReactFlow();
  return (
    <Panel
      position="top-right"
      className="flex gap-4  p-4  rounded-lg shadow-md"
    >
      <AddRoadtripButton
        addNode={props.addNode}
        updateChildNode={props.updateChildNode}
        removeChildNode={props.removeChildNode}
        addChildNode={props.addChildNode}
        removeNode={props.removeNode}
      />
      <AddTripButton
        updateNodeMetadata={props.updateNodeMetadata}
        addNode={props.addNode}
        removeNode={props.removeNode}
      />
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => fitView()}>Center</button>
      <SaveTripButton saveTrip={props.saveList} />
      <Link className="flex items-center" href="/trips">
        My Trips
      </Link>
    </Panel>
  );
}

export default PanelMenu;
