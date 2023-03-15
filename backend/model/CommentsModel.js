const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 2- Create Model
const CommentsModel = mongoose.model("Comments", CommentsSchema);

module.exports = CommentsModel;
