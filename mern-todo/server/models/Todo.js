const mongoose = require("mongoose");

// Schema: shape + validation rules for every task document
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task text is required"],
      trim: true,
      maxlength: 200,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

// Model: the class we use to query the "todos" collection
module.exports = mongoose.model("Todo", todoSchema);
