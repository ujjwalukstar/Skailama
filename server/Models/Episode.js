const { Schema, model } = require("mongoose");

const episodeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Episode name is required !"],
    },
    content: {
      type: String,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: [true, "Project id is required !"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required !"],
    },
  },
  { timestamps: true }
);

const episodeModel = model("episodes", episodeSchema);

module.exports = episodeModel;
