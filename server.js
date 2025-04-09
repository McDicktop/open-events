require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");

const authRouter = require("./routes/authRouter.js");
const eventRouter = require("./routes/eventRouter.js");


app.use(express.json());
app.use(cors());

app.use("/cache/images", express.static("cache/images")); 

app.use("/auth", authRouter);
app.use("/event", eventRouter);

const start = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/app");
        console.log('connected to app db');
        app.listen(port, () => console.log('Server starts on port', port));
    } catch (e) {
        console.log(e)
    }
}

start();