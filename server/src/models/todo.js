const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Todo", todoSchema);
