const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  subscribe,
  unsubscribe,
  Like,
  dislike,
  getAllUser,
} = require("../controller/usersController");
const { verifyToken } = require("../verifyToken");
const router = express.Router();

router.get("", verifyToken, getAllUser);
router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

// ====== subscribe && unsubscribe =========
router.put("/sub/:id", verifyToken, subscribe);
router.put("unsub/:id", verifyToken, unsubscribe);

// ========= Like && dislike Video ======
router.put("/like/:videoId", verifyToken, Like);
router.put("dislike/:videoId", verifyToken, dislike);

module.exports = router;
