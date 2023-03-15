const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/database");
const cookieParser = require("cookie-parser");

/* ======= Routes ========= */
const usersRoutes = require("./routes/usersRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const videosRoutes = require("./routes/videosRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
require("dotenv").config();

app.use(cookieParser());
app.use(cors());
dbConnection();

/* ======= Routes ========= */
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/auth", authRoutes);

app.listen(9000, () => {
  console.log(`Connect to: http://localhost:9000`);
});
