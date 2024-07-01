import React, { memo, useEffect, useRef, useState } from "react";
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

const CustomNode = ({ data }: NodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const initialYRef = useRef<number>(data.position.y);

  const updatePosition = () => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const height = rect.height;
      const newY = initialYRef.current;

      data.updateNodePosition(data.nodeId, {
        x: data.position.x,
        y: newY,
      });

      if (data.nodeId === "end-node") {
        console.log({
          nodeId: data.nodeId,
          newY,
          height: rect.height,
          bottom: rect.bottom,
          top: rect.top,
        });
      }
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updatePosition();
  }, [isOpen]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updatePosition();
  }, [data]);

  return (
    <div
      ref={nodeRef}
      // style={{ transform: `translateY(${isOpen ? -nodeHeight : 0}px)` }}
      className="nodrag z-10 text-black border rounded-md flex flex-col p-1 border-white bg-gray-300"
    >
      <Collapsible
        open={isOpen}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        className={cn(
          {
            "border-gray-400": isOpen,
            "min-w-md": !isOpen,
          },
          `
        w-48
        `
        )}
      >
        <CollapsibleTrigger asChild>
          <div className="p-4 bg-gray-300 cursor-pointer">
            {data.name ?? data.date}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card>
            <CardHeader>
              <CardTitle>{data.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {data.date} - {data.name}
              </CardDescription>
              <CardDescription>
                <Label htmlFor="body">{data.body}</Label>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      <Handle
        type="source"
        position={Position.Right}
        id={
          data.nodeId === "start-node"
            ? "start-node"
            : data.nodeId === "end-node"
            ? "end-node"
            : "default"
        }
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={
          data.nodeId === "start-node"
            ? "start-node"
            : data.nodeId === "end-node"
            ? "end-node"
            : "default"
        }
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default memo(CustomNode);
