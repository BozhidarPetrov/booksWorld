const Book = require("../models/Book");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

exports.commentBook = async (req, res) => {
  const bookID = new mongoose.Types.ObjectId(req.body.bookId);
  const author = new mongoose.Types.ObjectId(req.body.userId);
  const username = req.body.username;
  const text = req.body.comment.text;

  let comment = await Comment.create({
    bookID,
    author,
    username,
    text,
  });

  const book = await Book.findById(bookID);

  if (!book) {
    throw new Error("Wrong book ID!");
  }

  try {
    book.comments.push(comment);

    await book.save();
    return res.status(201).json({ bookFromBackEnd: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId).lean();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editComment = async (req, res) => {
  const commentId = req.params.commentId;

  const text = req.body.text;

  const commentTemp = {
    text,
  };

  try {
    await Comment.findByIdAndUpdate(commentId, commentTemp);
    const comment = await Comment.findById(commentId);
    return res.status(201).json({ comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  const comment = await Comment.findById(commentId);
  const bookId = comment.bookID.toString();

  try {
    await removeFromCommentsList(bookId, commentId);

    const result = await Comment.findByIdAndDelete(commentId);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

async function removeFromCommentsList(bookId, commentId) {
  const book = await Book.findById(bookId);

  if (!book.comments.includes(commentId)) {
    throw new Error("You haven't commented that book!");
  }

  const commentsBeforeUpdate = book.comments;
  const bcommentsAfterUptate = book.comments.splice(
    book.comments.indexOf(commentId),
    1
  );

  await book.updateOne(
    { comments: commentsBeforeUpdate },
    { $set: { comments: bcommentsAfterUptate } }
  );
}

exports.likeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    const result = await like(commentId, userId);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
};

async function like(commentId, userId) {
  const comment = await Comment.findById(commentId);

  if (comment.likes.includes(userId)) {
    throw new Error("You have already liked that comment!");
  }
  comment.likes.push(userId);

  await comment.save();
}

exports.dislikeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    const result = await dislike(commentId, userId);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
};

async function dislike(commentId, userId) {
  const comment = await Comment.findById(commentId);

  if (!comment.likes.includes(userId)) {
    throw new Error("You haven't liked that comment!");
  }

  comment.likes.splice(comment.likes.indexOf(userId), 1);

  await comment.save();
}
