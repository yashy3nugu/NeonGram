const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path")
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@neongram.gtkla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// const db = process.env.DB

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false })
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static('uploads'))

//routes

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comment",commentRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });

