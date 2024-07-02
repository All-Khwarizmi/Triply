import AddNodeForm from "@/app/timectx/AddNodeElementNode";
import DateInput from "@/app/timectx/DateInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, Minus, Plus } from "lucide-react";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import type { NodeData, NodeExtend } from "@/app/timectx/helpers/list";

function DrawerMenu(props: {
  addNode: (node: NodeExtend) => void;
  updateNodeMetadata: (
    nodeId: string,
    metadata: Partial<
      Pick<NodeData, "label" | "body" | "name" | "slug" | "date">
    >
  ) => void;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MenuIcon size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex justify-between">
                <h1>Menu</h1>
                <ModeToggle />
              </div>
            </DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex h-full mt-8 flex-col gap-8 w-full justify-center items-center">
            <DateInput />
            <AddNodeForm
              addNode={props.addNode}
              updateNodePosition={() => {}}
              updateNodeMetadata={props.updateNodeMetadata}
            />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerMenu;
