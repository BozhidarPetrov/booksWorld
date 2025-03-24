const express = require("express");
const {
  commentBook,
  getSingleComment,
  editComment,
  deleteComment,
  likeComment,
  dislikeComment,
} = require("../controllers/commentCotroller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/new", protect, commentBook);
router.get("/:commentId", getSingleComment);
router.put("/:commentId/edit", protect, editComment);
router.get("/:commentId/delete", protect, deleteComment);
router.post("/:commentId/like", protect, likeComment);
router.post("/:commentId/dislike", protect, dislikeComment);

module.exports = router;
