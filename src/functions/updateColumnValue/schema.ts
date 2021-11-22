export default {
  type: "object",
  properties: {
    value: { type: "string" },
    itemId: { type: "string" },
    boardId: { type: "string" },
    columnId: { type: "string" },
  },
  required: ["boardId"],
} as const;
