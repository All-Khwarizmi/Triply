import React from "react";
import { useCallback } from "react";
import { Handle, type NodeProps, Position } from "reactflow";

const handleStyle = { left: 10 };

function TimeLineNodeElement(props: NodeProps) {
  const timeLineRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (timeLineRef.current) {
      const rect = timeLineRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      console.log("Clicked at:", "X:",clickX,"Y:", clickY);

      // Calculate the point to insert the node based on clickX
      const totalWidth = rect.width;
      const positionPercentage = (clickX / totalWidth) * 100;
      console.log("Position Percentage:", positionPercentage);

      // Here you can insert the logic to add a node at this position
    }
  };

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        ref={timeLineRef}
        onClick={handleClick}
        className={`
        nodrag text-black
        border rounded-md
        flex flex-col p-1
        w-screen border-white bg-gray-300
      `}
      >
        {/* Existing content of the node */}
      </div>
    </>
  );
}

export default TimeLineNodeElement;
