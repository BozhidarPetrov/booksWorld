const express = require("express");
const {
  addBook,
  getAllBooks,
  getSingleBook,
  likeBook,
  deleteBook,
  editBook,
  dislikeBook,
} = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, addBook);
router.get("/all", getAllBooks);
router.get("/:bookId/details", getSingleBook);
router.post("/:bookId/like", protect, likeBook);
router.post("/:bookId/dislike", protect, dislikeBook);
router.get("/:bookId/delete", protect, deleteBook);
router.put("/:bookId/edit", protect, editBook);

module.exports = router;
