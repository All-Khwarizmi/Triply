import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { NodeData } from "./helpers/list";

const NODE_BG_COLORS = [
  "#4B5563", // Slate Gray
  "#374151", // Charcoal
  "#1F2937", // Dark Charcoal
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#6366F1", // Indigo
  "#8B5CF6", // Purple
  "#EC4899", // Pink
];

const getRandomColor = () =>
  NODE_BG_COLORS[Math.floor(Math.random() * NODE_BG_COLORS.length)];

const CustomNode = ({ data }: NodeProps<NodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(data.date);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.body);
  const nodeRef = useRef<HTMLDivElement>(null);
  const initialYRef = useRef<number>(data.position.y);
  const color = useMemo(() => getRandomColor(), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const newY = initialYRef.current;
      // Update node position logic here if needed
      if (data.nodeId === "end-node") {
        console.log({ nodeWidth: rect.width });
      }
    }
  }, [isOpen, data]);

  const handleSave = () => {
    // Implement save functionality
  };

  return (
    <div
      ref={nodeRef}
      className={cn(
        "nodrag z-10 text-black  rounded-md flex flex-col p-4 border-white"
      )}
      style={{ backgroundColor: color }}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn("overflow-scroll  rounded-md", {
          "border-gray-400": isOpen,
          "min-w-md": !isOpen,
        })}
      >
        <CollapsibleTrigger asChild>
          <div className="rounded-lg w-[200px] h-[80px] flex flex-col items-center justify-center">
            <div className="text-white font-bold text-lg">
              Day {data.dayOfTrip}: <span>{data.name}</span>
            </div>
            <div className="text-white text-sm">{data.date}</div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card
            className="bg-white border border-gray-400 rounded-md"
            style={{ backgroundColor: color }}
          >
            <div className="bg-card rounded-lg shadow-md w-[400px]  p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-muted"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-muted resize-none h-32"
                />
              </div>
              <div className="mt-auto">
                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      <Handle
        type="source"
        position={Position.Right}
        id={data.nodeId}
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={data.nodeId}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default memo(CustomNode);
