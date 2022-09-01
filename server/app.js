const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const errorController = require("./controllers/errorController");

const app = express();

const port = process.env.PORT || 5000;

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@neongram.gtkla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const db = process.env.DB

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "client/build")));

app.use("/uploads", express.static("uploads"));

//routes

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});

app.use(errorController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
