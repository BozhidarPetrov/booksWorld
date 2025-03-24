const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  editUser,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/profile/edit", protect, editUser);

module.exports = router;
