export default {
  type: "object",
  properties: {
    boardId: { type: "string" }
  },
  required: ["boardId"],
} as const;
