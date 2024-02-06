const { Server } = require("socket.io");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());

app.listen(port, () => {
    console.log("Running on port " + port)
})