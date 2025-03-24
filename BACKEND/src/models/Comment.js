const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: [10, "Comment length must be at least 10 characters!"],
      maxLength: [5000, "Comment length must be no more than 5000 characters!"],
    },
    bookID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { autoIndex: true },
  { autoCreate: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
