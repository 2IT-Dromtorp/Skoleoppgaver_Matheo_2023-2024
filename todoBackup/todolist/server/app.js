const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));
app.use(express.json());

app.get("/api/items", (req, res) => {
  const desiredUser = req.query.user; // Get the user from the query parameter
  const fileName = `./${desiredUser}.json`;
  console.log(fileName)
  console.log("fileName")



  try {
    const raw = fs.readFileSync(fileName);
    const items = JSON.parse(raw);
    res.send(items);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    res.status(500).send(`Error reading ${fileName}: ${error.message}`);
  }
});

app.post("/api/items", function(req, res) {
  console.log(req.body.user)
  fs.writeFile(`./${req.body.user}.json`, JSON.stringify(req.body.list), function (err) {
      if (err) {
          console.error(err)
          res.status(500).send("Internal Server Error")
      } else {
        console.log("Data saved")
        res.status(200).json({ message: "Data saved successfully" });
      }

  })

})

app.post("/api/user", function(req, res) {
  const raw = req.body.person
  console.log(raw)
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === raw) {
      const currentUser = users[i].name
      console.log(currentUser)
      res.send({ "currentUser": currentUser });
      break; 
    }
  }
})

app.get("/api/user", (req, res) => {
  try {
  } catch (error) {
    console.error("Error reading user.json:", error);
    res.status(500).send("Internal Server Error");
  }
});