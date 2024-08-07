import type { NodeData, NodeExtend } from "@/utils/list";

export const mockData: NodeExtend[] = [
  {
    id: "1",
    type: "trip",
    position: { x: 0, y: 0 },
    data: {
      label: "Day 1: Arrival",
      date: "2024-07-04",
      name: "Arrival at Yosemite",
      body: "Arrive at Yosemite National Park and check-in to the lodge.",
      slug: "arrival-yosemite",
      nodeId: "1",
      dayOfTrip: 1,
      updateNodePosition: (nodeId, position) => {},
      updateNodeMetadata: (nodeId, metadata) => {},
      position: { x: 0, y: 0 },
      prevNode: null,
      nextNode: null,
      typeOfTrip: "trip",
      isParent: false,
      status: "must-do",
    },
  },
  {
    id: "2",
    type: "roadtrip",
    position: { x: 200, y: 0 },
    data: {
      label: "Road Trip to the Coast",
      date: "2024-07-05",
      name: "Scenic Drive to the Coast",
      body: "A beautiful drive through the mountains to the Pacific coast.",
      slug: "drive-coast",
      nodeId: "2",
      dayOfTrip: 2,
      updateNodePosition: (nodeId, position) => {},
      updateNodeMetadata: (nodeId, metadata) => {},
      position: { x: 200, y: 0 },
      prevNode: null,
      nextNode: null,
      typeOfTrip: "roadtrip",
      isParent: true,
      status: "conditional",
      children: [
        {
          id: "2-1",
          type: "trip",
          position: { x: 210, y: 50 },
          data: {
            label: "Stop 1: Mountain View",
            date: "2024-07-05",
            name: "Mountain View Point",
            body: "Enjoy the scenic view of the mountains.",
            slug: "mountain-view",
            nodeId: "2-1",
            dayOfTrip: 2,
            updateNodePosition: (nodeId, position) => {},
            updateNodeMetadata: (nodeId, metadata) => {},
            position: { x: 210, y: 50 },
            prevNode: null,
            nextNode: null,
            typeOfTrip: "trip",
            isParent: false,
            status: "if-time",
          },
        },
        {
          id: "2-2",
          type: "trip",
          position: { x: 220, y: 100 },
          data: {
            label: "Stop 2: Lunch Break",
            date: "2024-07-05",
            name: "Lunch at Cozy Café",
            body: "Have lunch at the Cozy Café along the route.",
            slug: "lunch-cozy-cafe",
            nodeId: "2-2",
            dayOfTrip: 2,
            updateNodePosition: (nodeId, position) => {},
            updateNodeMetadata: (nodeId, metadata) => {},
            position: { x: 220, y: 100 },
            prevNode: null,
            nextNode: null,
            typeOfTrip: "trip",
            isParent: false,
            status: "new",
          },
        },
      ],
    },
  },
  {
    id: "3",
    type: "trip",
    position: { x: 400, y: 0 },
    data: {
      label: "Day 3: Beach Day",
      date: "2024-07-06",
      name: "Relaxing at the Beach",
      body: "Spend the day relaxing at the beautiful Pacific coast beach.",
      slug: "beach-day",
      nodeId: "3",
      dayOfTrip: 3,
      updateNodePosition: (nodeId, position) => {},
      updateNodeMetadata: (nodeId, metadata) => {},
      position: { x: 400, y: 0 },
      prevNode: null,
      nextNode: null,
      typeOfTrip: "trip",
      isParent: false,
      status: "must-do",
    },
  },
  {
    id: "4",
    type: "trip",
    position: { x: 600, y: 0 },
    data: {
      label: "Day 4: Return",
      date: "2024-07-07",
      name: "Return to Yosemite",
      body: "Drive back to Yosemite and prepare for departure.",
      slug: "return-yosemite",
      nodeId: "4",
      dayOfTrip: 4,
      updateNodePosition: (nodeId, position) => {},
      updateNodeMetadata: (nodeId, metadata) => {},
      position: { x: 600, y: 0 },
      prevNode: null,
      nextNode: null,
      typeOfTrip: "trip",
      isParent: false,
      status: "must-do",
    },
  },
];
