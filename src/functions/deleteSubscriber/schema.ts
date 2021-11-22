export default {
  type: "object",
  properties: {
    boardId: { type: "string" },
    userId: { type: "Array" },
  },
  // required: ["boardId"],
} as const;
