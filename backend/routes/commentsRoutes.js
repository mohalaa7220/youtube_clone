const express = require("express");
const router = express.Router();
const { verifyToken } = require("../verifyToken");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controller/commentsController");

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", verifyToken, getComments);

module.exports = router;
