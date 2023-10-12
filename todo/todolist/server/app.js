const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require("cors"); 
app.use(cors());

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));
app.use(express.json());

app.get("/api/items", (req, res) => {
  const desiredUser = req.query.user;
  const fileName = `./${desiredUser}.json`;

  fs.readFile(fileName, (err, data) => {
    if (err) {
      // console.error(`Error reading ${fileName}:`, err);
      res.status(404).send(`User-specific items not found`);
    } else {
      const items = JSON.parse(data);
      res.send(items);
    }
  });
});

app.post("/api/items", function (req, res) {
  fs.writeFile(`./${req.body.user}.json`, JSON.stringify(req.body.list), function (err) {
    if (err) {
      // console.error(err);
      res.status(500).json({ error: "Internal Server 1" });
    } else {
      res.status(200).json({ message: "Data saved successfully" });
    }
  });
});

app.get("/api/login", (req, res) => {
  const desiredUser = req.query.user;
  const inputUser = desiredUser.toLowerCase();
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);

  for (let i = 0; i < users.length; i++) {
    if (users[i].name !== inputUser) {
      users[i].isLoggedIn = false;
    }
  }

  fs.writeFile(`./users.json`, JSON.stringify(users), function (err) {
    if (err) {
      // console.error(err+'2' + "deyyr");
      res.status(500).json({ error: "Internal Server 2" });
    } else {
      res.status(200).json({ message: "Data saved successfully" });
    }
  });

  let index;
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === inputUser) {
      index = i;
      break;
    }
  }

  try {
    res.json({ "isLoggedIn": users[index].isLoggedIn });
  } catch (error) {
    // console.error(`Error reading user.json:`, error);
    res.status(500).json({ error: `Error reading user.json: ${error.message}` });
  }
});

app.post("/api/user", async function (req, res) {
  const a = req.body.person;
  const b = req.body.password;
  const inputUser = a.toLowerCase();
  const inputPass = b.toLowerCase();
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);

  let currentUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === inputUser && await bcrypt.compare(inputPass, users[i].password)) {
      currentUser = users[i].name;
      users[i].isLoggedIn = true;
      break;
    }
  }

  fs.writeFile(`./users.json`, JSON.stringify(users), function (err) {
    if (err) {
      // console.error(err + "deyyr");
      res.status(500).json({ error: "Internal Server 3" });
    } else {
      if (currentUser) {
        res.json({ "currentUser": currentUser });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }
    }
  });
});

app.post("/api/create", async function (req, res) {
  const input = req.body;
  const a = input.name;
  const inputUser = a.toLowerCase();
  const rawUsers = fs.readFileSync('./users.json');
  const users = JSON.parse(rawUsers);

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === inputUser) {
      foundUser = users[i];
      break;
    }
  }

  if (foundUser) {
    res.status(400).json({ error: `${foundUser.name} already exists` }); // Changed to status 400 for client error
  } else {
    const content = '[]';
    const filePath = `${inputUser}.json`;

    fs.writeFile(filePath, content, async (err) => {
      if (err) {
        // console.error('Error creating the file:', err);
        res.status(500).json({ error: "Internal Server 4" });
      } else {
        const hashedPass = await bcrypt.hash(input.password, saltRounds);
        input.password = hashedPass;
        users.push(input);
        fs.writeFile(`./users.json`, JSON.stringify(users), function (err) {
          if (err) {
            // console.error(err + "deyyr");
            res.status(500).json({ error: "Internal Server 5" });
          } else {
            res.status(200).json({ message: "Data saved successfully" });
          }
        });
        }
    });
  }
});