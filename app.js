const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology:true })
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes

const userRoutes = require("./routes/userRoutes");

app.use("/api",userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });

