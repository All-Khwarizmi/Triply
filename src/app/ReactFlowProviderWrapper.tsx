"use client";
import { ReactFlowProvider } from "reactflow";

function ReactFlowProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}

export default ReactFlowProviderWrapper;
