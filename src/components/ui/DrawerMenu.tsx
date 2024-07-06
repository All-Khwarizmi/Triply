import AddNodeForm from "@/components/AddNodeElementNode";
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
import { MenuIcon } from "lucide-react";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import type { NodeExtend, NodeData } from "@/utils/list";

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
              <div className="flex justify-center py-4">
                <ModeToggle />
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex h-full mt-4 flex-col gap-8 w-full justify-center items-center">
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
