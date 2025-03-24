const mongoose = require("mongoose");

const URL_PATTERN = /^https?:\/\/(.+)$/;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required!"],
    minLength: [1, "Title length must be at least 1 character!"],
    maxLength: [50, "Title length must be no more than 50 characters!"],
  },
  author: {
    type: String,
    required: [true, "Book author is required!"],
    minLength: [4, "Author name length must be at least 4 characters!"],
    maxLength: [30, "Author name length must be no more than 30 characters!"],
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required!"],
    minLength: [10, "Short description length must be at least 10 characters!"],
    maxLength: [
      300,
      "Short description length must be no more than 300 characters!",
    ],
  },
  fullDescription: {
    type: String,
    required: [true, "Full description is required!"],
    minLength: [10, "Full description length must be at least 10 characters!"],
    maxLength: [
      1000,
      "Full description length must be no more than 1000 characters!",
    ],
  },
  coverPicture: {
    type: String,
    required: [true, "Cover picture is required!"],
    validate: {
      validator(value) {
        return URL_PATTERN.test(value);
      },
      message: "Cover image URL must start with http:// or https://!",
    },
  },
  myOpinion: {
    type: String,
    required: [true, "Your opinion is required!"],
    minLength: [10, "Your opinion length must be at least 10 characters!"],
    maxLength: [
      1000,
      "Your opinion length must be no more than 1000 characters!",
    ],
  },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
