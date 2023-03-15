const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// SignUp
exports.register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await UserModel({ ...req.body, password: hash });
    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "User" });
  }
};

// LogIn Controller
exports.Login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Email Or Password InCorrect" });

    const { password, ...other } = user._doc;
    const token = jwt.sign({ id: user._id }, "auwhhnhudydbbddy");
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "User LogIn Successfully",
        user: { ...other },
        token: token,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
