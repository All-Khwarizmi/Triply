"use client";
import "reactflow/dist/style.css";
import App from "./timectx/page";
import { ReactFlowProvider } from "reactflow";

function Page() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default Page;
