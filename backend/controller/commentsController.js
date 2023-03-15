const VideoModel = require("../model/VideoModel");
const UsersModel = require("../model/UserModel");
const CommentsModel = require("../model/CommentsModel");

// Add Comments
exports.addComment = async (req, res) => {
  try {
    const newComment = new CommentsModel({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res
      .status(201)
      .json({ message: "add comment successfully", comment: savedComment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error adding video" });
  }
};

// get Comments
exports.getComments = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// get Comments
exports.deleteComment = async (req, res) => {
  try {
    const comment = await CommentsModel.findById(req.params.id);
    const video = await VideoModel.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await CommentsModel.findByIdAndDelete(req.params.id);
      res.status(402).json({ message: "deleted success" });
    } else {
      res.status(401).json({ message: "Don't have permission" });
    }
  } catch (error) {
    console.log(error);
  }
};
