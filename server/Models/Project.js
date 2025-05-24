const { Schema, model } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required !"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is Required !"],
    },
  },
  { timestamps: true }
);

projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const projectModel = model("projects", projectSchema);

module.exports = projectModel;
