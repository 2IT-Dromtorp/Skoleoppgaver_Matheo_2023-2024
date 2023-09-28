const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));
app.use(express.json()); // Add this line to parse JSON request bodies

app.get("/api/items", (req, res) => {
  try {
    const raw = fs.readFileSync('./tasks.json');
    const items = JSON.parse(raw);
    res.send(items);
  } catch (error) {
    console.error("Error reading tasks.json:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/items", (req, res) => {
    console.log(req.body)
  });

app.use(cors());
