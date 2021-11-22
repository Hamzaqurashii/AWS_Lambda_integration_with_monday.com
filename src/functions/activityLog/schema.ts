export default {
  type: "object",
  properties: {
    boardId: { type: "string" },
    from: { type: "string" },
    to: { type: "string" },
  },
  // required: ["boardId"],
} as const;
