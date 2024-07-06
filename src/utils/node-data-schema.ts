import { z } from "zod";
import { NodeExtendSchema } from "./schemas";

export const NodeDataSchema = z.object({
  label: z.string(),
  date: z.string(),
  name: z.string(),
  body: z.string(),
  slug: z.string(),
  nodeId: z.string(),
  typeOfTrip: z.union([z.literal("trip"), z.literal("roadtrip")]).optional(),
  isParent: z.boolean().optional(),
  dayOfTrip: z.number(),
  prevNode: NodeExtendSchema,
  nextNode: NodeExtendSchema,
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
