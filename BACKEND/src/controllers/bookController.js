const Book = require("../models/Book");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

exports.addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      shortDescription,
      fullDescription,
      coverPicture,
      myOpinion,
    } = req.body;

    const book = await Book.create({
      title,
      author,
      shortDescription,
      fullDescription,
      coverPicture,
      myOpinion,
      owner: req.user._id,
    });
    return res.status(201).json({ bookFromBackEnd: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("owner");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId)
      .lean()
      .populate("comments")
      .populate("likes")
      .populate("owner")
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
      });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likeBook = async (req, res) => {
  const bookId = req.params.bookId;

  const userId = req.user._id;

  try {
    const result = await like(bookId, userId);

    await addToLikedList(bookId, userId);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
};

exports.dislikeBook = async (req, res) => {
  const bookId = req.params.bookId;

  const userId = req.user._id;

  try {
    const result = await dislike(bookId, userId);

    await removeFromLikedList(bookId, userId);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
};

async function like(bookId, userId) {
  const book = await Book.findById(bookId);

  if (book.likes.includes(userId)) {
    throw new Error("You have already liked that book!");
  }
  book.likes.push(userId);

  await book.save();
}

async function dislike(bookId, userId) {
  const book = await Book.findById(bookId);

  if (!book.likes.includes(userId)) {
    throw new Error("You haven't liked that book!");
  }

  book.likes.splice(book.likes.indexOf(userId), 1);

  await book.save();
}

async function addToLikedList(bookId, userId) {
  const user = await User.findById(userId);

  if (user.favoriteBooks.includes(bookId)) {
    throw new Error("You have already liked that book!");
  }

  const booksBeforeUpdate = user.favoriteBooks;
  const booksAfterUptate = user.favoriteBooks.push(bookId);

  await user.updateOne(
    { favoriteBooks: booksBeforeUpdate },
    { $set: { favoriteBooks: booksAfterUptate } }
  );
}

async function removeFromLikedList(bookId, userId) {
  const user = await User.findById(userId);

  if (!user.favoriteBooks.includes(bookId)) {
    throw new Error("You haven't liked that book!");
  }

  const booksBeforeUpdate = user.favoriteBooks;
  const booksAfterUptate = user.favoriteBooks.splice(
    user.favoriteBooks.indexOf(bookId),
    1
  );

  await user.updateOne(
    { favoriteBooks: booksBeforeUpdate },
    { $set: { favoriteBooks: booksAfterUptate } }
  );
}

exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const result = await Book.findByIdAndDelete(bookId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

exports.editBook = async (req, res) => {
  const bookId = req.params.bookId;

  const {
    title,
    author,
    shortDescription,
    fullDescription,
    coverPicture,
    myOpinion,
  } = req.body;

  const book = {
    title,
    author,
    shortDescription,
    fullDescription,
    coverPicture,
    myOpinion,
    _id: req.params.bookId,
  };

  console.log(req);

  try {
    const result = await update(bookId, book);
    return res.status(201).json({ bookFromBackEnd: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function update(bookId, book) {
  const existing = await Book.findById(bookId);

  if (!existing) {
    throw new Error("Wrong Book Id!");
  }

  existing.title = book.title;
  existing.author = book.author;
  existing.shortDescription = book.shortDescription;
  existing.fullDescription = book.fullDescription;
  existing.coverPicture = book.coverPicture;
  existing.myOpinion = book.myOpinion;

  await existing.save();

  return existing;
}
