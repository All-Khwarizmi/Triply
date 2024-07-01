import React, { memo, useEffect, useRef, useState } from "react";
import type { NodeProps } from "reactflow";
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const height = rect.height;
      const bottom = rect.bottom;
      const { x, y, width, height: nodeHeight, bottom: nodeBottom } = rect;
      const top = rect.top;
      if (data.updateNodePosition) {
        console.log({
          nodeId: data.nodeId,
          x,
          y,
          width,
          height: nodeHeight,
          bottom: nodeBottom,
          top,
        });

        data.updateNodePosition(data.nodeId, {
          x: data.position.x,
          y: isOpen ? data.position.y - height : data.position.y,
        });
      }
    }
  }, [data, isOpen]);

  return (
    <div
      ref={nodeRef}
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
    </div>
  );
};

export default memo(CustomNode);
