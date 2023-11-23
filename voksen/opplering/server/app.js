const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

app.get('/getdata', (req, res) => { //Returnerer flere av samme. vet ikke hvordan jeg order det. tenker å kutte det ut manuelt
    const query = 'SELECT DISTINCT courses.id, times.timeStart, times.day, times.timeEnd, courses.courseName, courses.pictureAddress FROM courses INNER JOIN times ON courses.id = times.idOfCourse;'
    pool.query(query, (err, results)=>{
      if(err){
        console.log(err)
        res.status(500).send(err)
      }else{
        console.log(results)
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
