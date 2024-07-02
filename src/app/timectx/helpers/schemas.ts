import { z } from "zod";

export const NodeDataSchema = z.object({
  label: z.string(),
  date: z.string(),
  name: z.string(),
  body: z.string(),
  slug: z.string(),
  nodeId: z.string(),
  dayOfTrip: z.number(),
  updateNodePosition: z.function(
    z.tuple([z.string(), z.object({ x: z.number(), y: z.number() })], z.void())
  ),
  updateNodeMetadata: z.function(
    z.tuple([
      z.string(),
      z.object({
        label: z.string().optional(),
        body: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        date: z.string().optional(),
      }),
    ]),
    z.void()
  ),
  position: z.object({ x: z.number(), y: z.number() }),
});

export const NodeSchema = z.object({
  id: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
  data: NodeDataSchema,
  type: z.string().optional(),
  style: z.record(z.string()).optional(),
  className: z.string().optional(),
  sourcePosition: z.string().optional(),
  targetPosition: z.string().optional(),
  hidden: z.boolean().optional(),
  selected: z.boolean().optional(),
  dragging: z.boolean().optional(),
  draggable: z.boolean().optional(),
  selectable: z.boolean().optional(),
  connectable: z.boolean().optional(),
  deletable: z.boolean().optional(),
  dragHandle: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  parentNode: z.string().optional(),
  parentId: z.string().optional(),
  zIndex: z.number().optional(),
  extent: z.union([z.literal("parent"), z.string()]).optional(),
  expandParent: z.boolean().optional(),
  positionAbsolute: z.object({ x: z.number(), y: z.number() }).optional(),
  ariaLabel: z.string().optional(),
  focusable: z.boolean().optional(),
  resizing: z.boolean().optional(),
  internalsSymbol: z
    .object({
      z: z.number().optional(),
      handleBounds: z.unknown().optional(),
      isParent: z.boolean().optional(),
    })
    .optional(),
});

export const NodeExtendSchema = NodeSchema.extend({
  data: NodeDataSchema,
});
