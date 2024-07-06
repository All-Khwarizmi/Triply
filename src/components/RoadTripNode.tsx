"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { NodeData, NodeExtend } from "@/utils/list";

import { Handle, type NodeProps, Position } from "reactflow";
import ChildTripNode from "./ChildTripNode";
import { generateRandomNodeName } from "../../test/node-extend-helper";
import AddChildNodePopover from "./AddChildNodePopover";

export default function RoadTripNode({ data }: NodeProps<NodeData>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [childNodes, setChildNodes] = useState(data.children || []);
  const [dialogContent, setDialogContent] = useState<NodeExtend | null>(null);

  useEffect(() => {
    console.log("data.children", data.children);
    setChildNodes(data.children || []);
  }, [data.children]);
  const handleAddChild = ({ childNode }: { childNode: NodeExtend }) => {
    if (data.addChildNode) {
      data.addChildNode(data.nodeId, {
        ...childNode,
        data: {
          ...childNode.data,
          name: childNode.data.name || generateRandomNodeName(),
          isChild: true,
          parentId: data.nodeId,
          removeChildNode: data.removeChildNode,
          updateChildNode: data.updateChildNode,
        },
      });
    }
  };

  const handleRemoveChild = (id: string) => {
    if (data.removeChildNode) {
      data.removeChildNode(data.nodeId, id);
    }
  };

  const handleOpenDialog = (content: NodeExtend) => {
    setDialogContent(content);
  };

  return (
    <>
      <Card
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 cursor-pointer transition-colors"
      >
        <CardContent className="flex items-center gap-4 p-4">
          <div className="bg-secondary-foreground/10 rounded-full p-2">
            <CalendarIcon className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-lg font-medium">
              {data.name === "" ? "Road Trip" : data.name}
            </h4>
            <p className="text-sm text-secondary-foreground/80">
              {/* The start and end date in a range format */}
              {data.date} - {data.endDate}
            </p>
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 text-secondary-foreground transition-transform ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </CardContent>
      </Card>

      {isExpanded && (
        <div className="pl-10 pt-4">
          {childNodes.map((node) => (
            <div key={node.id} className="relative mb-4">
              <ChildTripNode node={node} />
            </div>
          ))}
          <AddChildNodePopover
            handleAddChild={handleAddChild}
            updateChildNode={data.updateChildNode || (() => {})}
            removeChildNode={handleRemoveChild}
          />
        </div>
      )}

      <Dialog
        open={!!dialogContent}
        onOpenChange={() => setDialogContent(null)}
      >
        {dialogContent && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{dialogContent.data.name}</DialogTitle>
              <DialogDescription>{dialogContent.data.date}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Trip Details</h3>
                <p>{dialogContent.data.body}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogContent(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
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
    </>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14H7L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
