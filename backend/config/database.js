const mongoose = require("mongoose");

const dbConnection = () => {
  // Connect DB
  mongoose
    .connect(
      "mongodb+srv://mohamed:dZSjIYupyl5Xqo41@cluster0.zfiscmb.mongodb.net/youtube_clone?retryWrites=true&w=majority"
    )
    .then((con) => {
      console.log(`Database connected`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = dbConnection;
