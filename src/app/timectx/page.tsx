"use client";
import type React from "react";
import ReactFlow, { Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import TimeLineNodeElement from "../timeline/TimelineNodeElement";
import { StageColumnNode } from "./StageColumn";
import useHandleNodeHooks from "./hooks/useHandleNodeHooks";
import DrawerMenu from "@/components/ui/DrawerMenu";
import PanelMenu from "./Panel";
import Header from "@/components/ui/Header";

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
  column: StageColumnNode,
};

const App: React.FC = () => {
  const {
    saveList,
    nodes,
    addNode,
    edges,
    onNodesChange,
    onEdgesChange,
    updateNodeMetadata,
  } = useHandleNodeHooks({
    tripDates: { startDate: new Date(), endDate: new Date() },
  });

  return (
    <div className="container h-screen mx-auto space-y-8 flex flex-col py-8">
      <header className="flex justify-between items-center h-10">
        <Header />

        <DrawerMenu addNode={addNode} updateNodeMetadata={updateNodeMetadata} />
      </header>
      <div className="h-full w-full flex flex-col ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <PanelMenu saveList={saveList} />
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;
