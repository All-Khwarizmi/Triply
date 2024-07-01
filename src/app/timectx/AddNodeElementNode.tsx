// AddNodeForm.tsx
import type React from "react";
import { useState } from "react";
import { useTimelineContext } from "./Context";
import dayjs from "dayjs";
import type { Node } from "reactflow";
interface AddNodeFormProps {
  addNode: (node: Node) => void;
  updateNodePosition: (
    nodeId: string,
    position: { x: number; y: number }
  ) => void;
}

const AddNodeForm: React.FC<AddNodeFormProps> = ({
  addNode,
  updateNodePosition,
}) => {
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { startDate } = useTimelineContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-");
    const daysFromStart = dayjs(date).diff(startDate, "day");
    const xPosition = daysFromStart * 40; // Example calculation for x position
    console.log("X Position:", xPosition);
    const id =
      name.length > 0 ? crypto.randomUUID() + slug : crypto.randomUUID();
    const customNode: Node = {
      id,
      type: "customNode",
      position: { x: xPosition, y: -100 },
      data: {
        date,
        name,
        body,
        slug,
        nodeId: id,
        updateNodePosition,
        position: { x: xPosition, y: -100 },
      },
    };

    const columnNode: Node = {
      id: `${id}-column`,
      type: "column",
      position: { x: xPosition + 40, y: -60 },
      data: {
        date,
        name,
        body,
        slug,
        nodeId: `${id}-column`,
        updateNodePosition,
      },
    };

    addNode(customNode);
    addNode(columnNode);

    setDate(dayjs().format("YYYY-MM-DD"));
    setName("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <label htmlFor="date" className="block">
          Date:
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="name" className="block">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="body" className="block">
          Body:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Node
      </button>
    </form>
  );
};

export default AddNodeForm;
