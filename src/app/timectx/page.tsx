"use client";
import type React from "react";
import ReactFlow, { Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../../components/CustomNode";
import TimeLineNodeElement from "../timeline/TimelineNodeElement";
import { StageColumnNode } from "../../components/StageColumn";
import useHandleNodeHooks from "../../hooks/useHandleNodeHooks";
import DrawerMenu from "@/components/ui/DrawerMenu";
import PanelMenu from "../../components/Panel";
import Header from "@/components/ui/Header";

const nodeTypes = {
  customNode: CustomNode,
  timeline: TimeLineNodeElement,
  column: StageColumnNode,
};

const App: React.FC = () => {
  const {
    shareTrip,
    saveList,
    nodes,
    addNode,
    edges,
    onNodesChange,
    onEdgesChange,
    updateNodeMetadata,
    addChildNode,
    removeChildNode,
    updateChildNode,
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
          <PanelMenu
            saveList={saveList}
            addChildNode={addChildNode}
            removeChildNode={removeChildNode}
            updateChildNode={updateChildNode}
            addNode={addNode}
            removeNode={() => {}}
            updateNodeMetadata={updateNodeMetadata}
            shareTrip={shareTrip}
          />
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;
