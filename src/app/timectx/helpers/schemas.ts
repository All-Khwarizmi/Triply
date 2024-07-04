import { z } from "zod";

export const NodeDataSchema = z.object({
  label: z.string(),
  date: z.string(),
  name: z.string(),
  body: z.string(),
  slug: z.string(),
  nodeId: z.string(),
  typeOfTrip: z.union([z.literal("trip"), z.literal("roadtrip")]),
  isParent: z.boolean(),
  status: z
    .union([
      z.literal("new"),
      z.literal("conditional"),
      z.literal("must-do"),
      z.literal("if-time"),
    ])
    .optional(),
  dayOfTrip: z.number(),
  updateNodePosition: z
    .function(
      z.tuple(
        [z.string(), z.object({ x: z.number(), y: z.number() })],
        z.void()
      )
    )
    .optional(),
  updateNodeMetadata: z
    .function(
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
    )
    .optional(),
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

export const EdgeLabelOptionsSchema = z.object({
  label: z.union([z.string(), z.unknown()]).optional(),
  labelStyle: z.record(z.string()).optional(),
  labelShowBg: z.boolean().optional(),
  labelBgStyle: z.record(z.string()).optional(),
  labelBgPadding: z.tuple([z.number(), z.number()]).optional(),
  labelBgBorderRadius: z.number().optional(),
});

export const DefaultEdgeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.union([z.string(), z.null()]).optional(),
  targetHandle: z.union([z.string(), z.null()]).optional(),
  style: z.record(z.string()).optional(),
  animated: z.boolean().optional(),
  hidden: z.boolean().optional(),
  deletable: z.boolean().optional(),
  data: z.unknown().optional(),
  className: z.string().optional(),
  sourceNode: z.unknown().optional(),
  targetNode: z.unknown().optional(),
  selected: z.boolean().optional(),
  markerStart: z.unknown().optional(),
  markerEnd: z.unknown().optional(),
  zIndex: z.number().optional(),
  ariaLabel: z.string().optional(),
  interactionWidth: z.number().optional(),
  focusable: z.boolean().optional(),
  updatable: z.union([z.boolean(), z.unknown()]).optional(),
  reconnectable: z.union([z.boolean(), z.string()]).optional(),
});

export const SmoothStepPathOptionsSchema = z.object({
  offset: z.number().optional(),
  borderRadius: z.number().optional(),
});

export const SmoothStepEdgeTypeSchema = DefaultEdgeSchema.extend({
  type: z.literal("smoothstep"),
  pathOptions: SmoothStepPathOptionsSchema.optional(),
});

export const BezierPathOptionsSchema = z.object({
  curvature: z.number().optional(),
});

export const BezierEdgeTypeSchema = DefaultEdgeSchema.extend({
  type: z.literal("default"),
  pathOptions: BezierPathOptionsSchema.optional(),
});

export const EdgeSchema = z.union([
  DefaultEdgeSchema,
  SmoothStepEdgeTypeSchema,
  BezierEdgeTypeSchema,
]);

export const ListNodeDatabaseSchema = z.object({
  nodes: z.array(NodeExtendSchema),
  edges: z.array(EdgeSchema),
});
