const express = require("express");
const { verifyToken } = require("../verifyToken");

const {
  getVideo,
  updateVideo,
  deleteVideo,
  addVideo,
  trend,
  random,
  subscribe,
  addView,
  getByTag,
} = require("../controller/videosController");
const router = express.Router();

router.get("/random", random);
router.get("/tags", getByTag);
router.get("/sub", verifyToken, subscribe);
router.post("/add", verifyToken, addVideo);

router
  .route("/:id")
  .get(verifyToken, getVideo)
  .put(verifyToken, updateVideo)
  .delete(verifyToken, deleteVideo);

router.put("/view/:id", addView);
router.get("/trend", trend);

module.exports = router;
