// AddNodeForm.tsx
import type React from "react";
import { useState } from "react";
import { useTimelineContext } from "./Context";
import dayjs from "dayjs";
import type { Node } from "reactflow";
import { Button } from "@/components/ui/button";
import type { NodeExtend } from "./helpers/list";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface AddNodeFormProps {
  addNode: (node: NodeExtend) => void;
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
    const id =
      name.length > 0 ? crypto.randomUUID() + slug : crypto.randomUUID();
    const customNode: NodeExtend = {
      id,
      type: "customNode",
      position: { x: xPosition, y: -100 },
      data: {
        label: date,
        nextNode: null,
        prevNode: null,
        date,
        name,
        body,
        slug,
        nodeId: id,
        updateNodePosition,
        position: { x: xPosition, y: -100 },
        dayOfTrip: 0,
      },
    };

    addNode(customNode);

    setDate(dayjs().format("YYYY-MM-DD"));
    setName("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <h2 className="text-xl text-center font-bold">Add Node</h2>
      <div className="flex gap-4">
        <div>
          <label htmlFor="date" className="block">
            Date:
          </label>
          <Input
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
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="body" className="block">
            Body:
          </label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default AddNodeForm;
