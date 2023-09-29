const express = require("express");
const fs = require("fs");
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

app.post("/api/items", function(req, res) {
  console.log(req.body)
  fs.writeFile('./tasks.json', JSON.stringify(req.body), function (err) {
      if (err) {
          console.error(err)
          res.status(500).send("Internal Server Error")
      } else {
          console.log("Data saved")
          res.status(200).send("Data saved successfully")
      }

  })

})
