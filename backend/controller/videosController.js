const VideoModel = require("../model/VideoModel");
const UsersModel = require("../model/UserModel");

// Add Video
exports.addVideo = async (req, res) => {
  const newVideo = new VideoModel({ userId: req.user.id, ...req.body });
  const savedVideo = await newVideo.save();
  res
    .status(201)
    .json({ message: "adding video successfully", video: savedVideo });
  try {
  } catch (error) {
    res.status(400).json({ message: "Error adding video" });
  }
};

// update Video
exports.updateVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(400).json({ message: "Video not found" });
    if (req.user.id === video.userId) {
      const updateVideo = await VideoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      return res
        .status(400)
        .json({ message: "You don't have to access this video" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error update video" });
  }
};

// delete Video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(400).json({ message: "Video not found" });
    if (req.user.id === video.user.id) {
      await VideoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "video deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "You don't have to access this video" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleted video" });
  }
};

// get Video
exports.getVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: "Error get video" });
  }
};

// get random Video
exports.random = async (req, res) => {
  try {
    const videos = await VideoModel.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ message: "Error random video" });
  }
};

// get trend Video
exports.trend = async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ message: "Error trend video" });
  }
};

// get Video subscribe
exports.subscribe = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return VideoModel.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(400).json({ message: "Error No video" });
    console.log(error);
  }
};

// add view
exports.addView = async (req, res) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json({ message: "views Increment" });
  } catch (error) {
    res.status(400).json({ message: "Error addView video" });
  }
};

exports.getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json({ data: videos });
  } catch (error) {
    res.status(400).json({ message: "Error addView video" });
  }
};
