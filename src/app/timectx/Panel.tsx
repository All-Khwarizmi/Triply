import React from "react";
import { useReactFlow, Panel } from "reactflow";
function PanelMenu(props: { saveList: () => void }) {
  const { zoomIn, zoomOut, setCenter, fitView } = useReactFlow();
  return (
    <Panel
      position="top-right"
      className="flex gap-4  p-4  rounded-lg shadow-md"
    >
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => zoomIn({ duration: 800 })}>zoom in</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => zoomOut({ duration: 800 })}>zoom out</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => fitView()}>center</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={props.saveList}>save</button>
    </Panel>
  );
}

export default PanelMenu;
