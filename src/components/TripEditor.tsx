"use client";
import React, { useMemo, type PropsWithRef } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/components/CustomNode";
import PanelMenu from "@/components/Panel";
import useHandleNodeHooks from "@/hooks/useHandleNodeHooks";
import type { Range } from "react-date-range";
import TripNode from "./TripNode";
import RoadTripNode from "./RoadTripNode";
import type { NodeList } from "@/utils/list";
export interface TripEditorProps {
  tripDates: Range;
  nodeList?: NodeList;
}

function TripEditor(props: PropsWithRef<TripEditorProps>) {
  const {
    shareTrip,
    saveList,
    nodes,
    addNode,
    addChildNode,
    removeChildNode,
    updateChildNode,
    edges,
    onNodesChange,
    onEdgesChange,
    updateNodeMetadata,
    removeNode,
  } = useHandleNodeHooks({
    tripDates: props.tripDates,
    nodeList: props.nodeList,
  });
  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
      tripNode: TripNode,
      roadtrip: RoadTripNode,
    }),
    []
  );
  return (
    <div className="h-[70vh] w-full flex flex-col ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <PanelMenu
          shareTrip={shareTrip}
          saveList={saveList}
          updateChildNode={updateChildNode}
          removeChildNode={removeChildNode}
          addChildNode={addChildNode}
          addNode={addNode}
          removeNode={removeNode}
          updateNodeMetadata={updateNodeMetadata}
        />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TripEditor;
