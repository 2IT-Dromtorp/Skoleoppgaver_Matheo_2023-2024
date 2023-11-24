const express = require("express");
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require('crypto');
const mysql = require("mysql2");

app.use(express.static("build"));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};

app.use(cors(corsOptions));

const experationTime = 1000*60*60*5


const dbConfig = {
  host: '10.20.64.137',
  port: 3306,
  user: 'hostpc',
  password: 'hostpassord123',
  database: 'todo',
};
const pool = mysql.createPool(dbConfig);

app.listen(PORT, () => console.log("Server started" + PORT))

app.get('/getdata', (req, res) => {
    const query = 'SELECT c.courseName, c.pictureAddress, c.id, t.timeStart, t.day, t.timeEnd FROM courses c INNER JOIN (SELECT timeStart, day, timeEnd, idOfCourse FROM (SELECT timeStart, day, timeEnd, idOfCourse, ROW_NUMBER() OVER (PARTITION BY idOfCourse ORDER BY day) AS RowNum FROM times) AS RankedTimes WHERE RowNum = 1) AS t ON c.id = t.idOfCourse;'
    pool.query(query, (err, results)=>{
      if(err){
        console.log(err)
        res.status(500).send(err)
      }else{
        res.send(results)
      }
    })
});

app.get('/getcourseinfo', (req, res) => {
  const requestID = req.query.q
  if(requestID===undefined){
    res.status(422).send("Incorrect data type")
    return;
  }
  const query = 'SELECT * FROM courses WHERE id=?'
  const values = [requestID]
  pool.query(query, values, (err, results)=>{
    if(err){
      console.log(err)
      res.status(500).send(err)
    }else{
      res.send(results)
    }
  })
});

app.post('/login', async(req, res) => {
  const b = req.body
  const username = b.username
  const unhashpass = b.password

  console.log(await bcrypt.hash(unhashpass, 10))

  if(username===undefined||unhashpass===undefined){
    res.status(422).send("Incorrect data type")
  }
  if(typeof(username)!=='string'||typeof(unhashpass)!=='string'){
    res.status(422).send("Incorrect data type")
  }

  const query = 'SELECT password FROM users WHERE email = ?'
  const values = [username]
  pool.query(query, values, (err, results)=>{
    if(err){
      console.log(err)
      res.status(510).send(err)
    }else{
      bcrypt.compare(unhashpass, results[0].password, (error, samePass) => {
        if(samePass){
          const token = crypto.randomBytes(256).toString('base64');
          res.cookie('auth', token, {
            maxAge: experationTime, 
            httpOnly: true, 
            secure: true, 
            sameSite: "lax" || 'none',
          })
          res.status(200).json("Yes work");
        } else{
          res.status(401).json("Incorrect password")
        }
      })
    }
  })
})

app.post('/create-user', (req, res) => {
  const b = req.body

  const checkQuery = 'SELECT email FROM users WHERE email = ?'
  const checkValues = [b.email]

  pool.query(checkQuery, checkValues, async (checkErr, CheckResults)=>{
    if(checkErr){
      console.log(checkErr)
      res.status(500).send(checkErr)
    }else{
      if(CheckResults.length===0){
        const hashedPass = await bcrypt.hash(b.password, 10)
        const query = 'INSERT INTO users (email, password, userName, phoneNumber) VALUES (?, ?, ?, ?)'
        const values = [b.email, hashedPass, b.username, b.number]
        pool.query(query, values, (err, results)=>{
          if(err){
            console.log(err)
            res.status(500).send(err)
          }else{
            res.send(results)
          }
        })
      } else{
        res.status(409).send(CheckResults)
      }
    }
  })

  
});
