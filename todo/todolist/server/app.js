const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require('crypto');

app.use(express.static("build"));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};

// const token = req.cookies.auth

//ALT UNDER SKAL KONVERTERES TIL SQL. OG DU SKAL I TILLEGG SETTE OPP EN DATABASE. JEG SKAL BRUKE TID NÅ, PÅ PRAKSIS, PÅ DESIGN, FORDI JEG HAR EN SERVER SOM KJØRER ALLEREDE, MEN NESTE GANG JEG JOBBER BLIR DET FOR DETTE.

app.use(cors(corsOptions));

app.listen(PORT, () => console.log("Server started"))

const experationTime = 1000*60*60*5
 
app.get("/api/items", (req, res) => {
  const desiredUser = req.query.user;
  const fileName = `./${desiredUser}.json`;

  fs.readFile(fileName, (err, data) => {
    if (err) {
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
      break;
    }
  }
  if (currentUser) {
    makeCookies(res);
    res.status(200).json({ "currentUser": currentUser });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

function makeCookies(res){
  const token = crypto.randomBytes(256).toString('base64');
  res.cookie('auth', token, {
    maxAge: experationTime, 
    httpOnly: true, 
    secure: true, 
    sameSite: "lax" || 'none',
  })
  //så skal i tillegg "isLoggedIn" settes til token
} 

app.post("/api/create", async (req, res) => {
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
        res.status(500).json({ error: "Internal Server 4" });
      } else {
        const hashedPass = await bcrypt.hash(input.password, saltRounds);
        input.password = hashedPass;
        users.push(input);
        fs.writeFile(`./users.json`, JSON.stringify(users), function (err) {
          if (err) {
            res.status(500).json({ error: "Internal Server 5" });
          } else {
            res.status(200).json({ message: "Data saved successfully" });
          }
        });
        }
    });
  }
});