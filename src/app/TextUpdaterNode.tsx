import { ChangeEventHandler, useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function TextUpdaterNode({ data }: any) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={`
     border  rounded-md
     flex flex-col p-4
        `}
      >
        <label htmlFor="text">Text:</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className={`
             nodrag text-black border border-gray-300 rounded-md
        `}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}

export default TextUpdaterNode;
