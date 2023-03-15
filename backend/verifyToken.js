const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not authorized to access!!!" });
  }

  jwt.verify(token, "auwhhnhudydbbddy", (err, user, next) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token!!!" });
    }
    req.user = user;
  });
  next();
};
