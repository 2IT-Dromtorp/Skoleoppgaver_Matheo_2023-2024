const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

app.post("/api/user", async function(req, res) {
  const a = req.body.person
  const b = req.body.password
  const inputUser = a.toLowerCase()
  const inputPass = b.toLowerCase()
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === inputUser && await bcrypt.compare(inputPass, users[i].password)===true) {
      const currentUser = users[i].name;
      res.send({ "currentUser": currentUser });
      break; 
    };
  };
});

app.get("/api/user", (req, res) => {
  try {
  } catch (error) {
    console.error("Error reading user.json:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/create", async function(req, res) {

  let input = req.body;
  const a = input.name
  const inputUser=a.toLowerCase()
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);
  
  const hashedPass = await bcrypt.hash(input.password, saltRounds)
  console.log(hashedPass)
  input.password=hashedPass


  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === inputUser) {
      foundUser = users[i];
      break;
    }
  }

  if (foundUser) {
    res.send({ "currentUser": `${foundUser.name} already exists` });

  } else {
    res.send({ "currentUser": inputUser });
    const content = '[]';
    const filePath = `${inputUser}.json`;

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
      } else {
        console.log('File created successfully.');
      }
    });

    users.push(input);
    fs.writeFile(`./users.json`, JSON.stringify(users), function (err) {
      if (err) {
          console.error(err)
          res.status(500).send("Internal Server Error")
      } else {
        console.log("Data saved")
        res.status(200).json({ message: "Data saved successfully" });
      }
    });
  }
});