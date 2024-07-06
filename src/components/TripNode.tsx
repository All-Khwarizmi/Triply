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
import type { NodeData } from "@/app/timectx/helpers/list";
import { useTheme } from "next-themes";
import { Handle, type NodeProps, Position } from "reactflow";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getNodeStatusColor } from "@/utils/status-color";
import { Label } from "./ui/label";
import { TrashIcon } from "lucide-react";

export default function TripNode({ data }: NodeProps<NodeData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { resolvedTheme, theme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const backgroundColor = getNodeStatusColor(data.status, isDarkMode);
  const [editableBody, setEditableBody] = useState(data.body);
  const [editableName, setEditableName] = useState(data.name);
  const [editableDate, setEditableDate] = useState(data.date);

  useEffect(() => {
    setIsDarkMode(theme === "dark" || resolvedTheme === "dark");
  }, [theme, resolvedTheme]);
  function handleSave() {
    data.updateNodeMetadata(data.nodeId, {
      ...data,
      body: editableBody,
      name: editableName,
      date: editableDate,
    });
    setIsDialogOpen(false);
  }
  function handleDelete() {
    if (data.removeChildNode) {
      data.removeChildNode(data.parentId ?? "", data.nodeId);
    }
    setIsDialogOpen(false);
  }
  return (
    <>
      <Card
        style={{ backgroundColor }}
        onClick={() => setIsDialogOpen(true)}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 cursor-pointer transition-colors"
      >
        <CardContent className="flex items-center gap-4 p-4">
          <div className="bg-secondary-foreground/10 rounded-full p-2">
            <CalendarIcon className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-lg font-medium">
              {data.name || "Trip to Yosemite"}
            </h4>
            <p className="text-sm text-secondary-foreground/80">
              {data.date || "July 4-8, 2024"}
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-secondary-foreground" />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="mt-12">
              {editableName || "Trip to Yosemite"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Label htmlFor="trip-date">Trip Date</Label>
            <Input
              type="date"
              value={editableDate}
              onChange={(e) => setEditableDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </DialogDescription>
          <DialogDescription>
            <Label htmlFor="trip-name">Trip Name</Label>
            <Input
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </DialogDescription>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold pb-4">Trip Details</h3>
              <Textarea
                value={editableBody}
                onChange={(e) => setEditableBody(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => handleDelete()}
              className="absolute top-2 left-2 py-2"
            >
              <TrashIcon className="w-5 h-5 text-secondary-foreground" />
            </Button>
            <Button onClick={handleSave}>Save</Button>

            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
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

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
