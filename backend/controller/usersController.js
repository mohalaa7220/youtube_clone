const UsersModel = require("../model/UserModel");
const VideoModel = require("../model/VideoModel");

// Get All User
exports.getAllUser = async (req, res) => {
  try {
    const getUsers = await UsersModel.find();
    res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json("ERROR");
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await UsersModel.findById(id);
    res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
    res.status(400).json("ERROR");
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await UsersModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {}
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "ERROR" });
  }
};

// subscribe
exports.subscribe = async (req, res) => {
  try {
    await UsersModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: { subscribedUsers: req.params.id },
      },
      { new: true }
    );
    await UsersModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { subscribes: 1 },
      },
      { new: true }
    );
    res.status(200).json({ message: "Subscribe successfully" });
  } catch (error) {
    res.status(400).json("RRREEESSS");
    console.log(error);
  }
};

// unsubscribe
exports.unsubscribe = async (req, res) => {
  try {
    await UsersModel.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await UsersModel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribes: -1 },
    });
    res.status(200).json({ message: "unSubscribe successfully" });
  } catch (error) {
    res.status(400).json("RRREEESSS");
    console.log(error);
  }
};

// like
exports.Like = async (req, res) => {
  const user = req.user.id;
  const videoId = req.params.videoId;
  try {
    await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { likes: user },
      $pull: { dislike: user },
    });
    res.status(200).json({ message: "video has been liked successfully" });
  } catch (error) {
    console.log(error);
  }
};

// dislike
exports.dislike = async (req, res) => {
  const user = req.user.id;
  const videoId = req.params.videoId;
  try {
    await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { dislike: user },
      $pull: { likes: user },
    });
    res.status(200).json({ message: "video has been liked successfully" });
  } catch (error) {
    console.log(error);
  }
};
