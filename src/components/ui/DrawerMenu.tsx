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
import type { Node } from "reactflow";
import { ModeToggle } from "./ModeToggle";

function DrawerMenu(props: { addNode: (node: Node) => void }) {
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
