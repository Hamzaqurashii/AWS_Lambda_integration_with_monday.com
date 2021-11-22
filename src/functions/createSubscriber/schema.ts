export default {
  type: "object",
  properties: {
    boardID: { type: "string" },
    userID: { type: "Array" },

  },
  // required: ["boardID"],
} as const;
