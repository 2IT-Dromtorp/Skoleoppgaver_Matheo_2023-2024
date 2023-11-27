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
  // host: '10.20.64.137', //Skolen
  host: '192.168.0.120', //Hjemme
  port: 3306,
  user: 'hostpc',
  password: 'hostpassord123',
  database: 'todo',
};
const pool = mysql.createPool(dbConfig);

app.listen(PORT, () => console.log("Server started" + PORT))

app.get('/getdata', (req, res) => {
    const query = 'SELECT c.courseName, c.pictureAddress, c.id, t.timeStart, t.day, t.timeEnd FROM courses c LEFT JOIN (SELECT timeStart, day, timeEnd, idOfCourse FROM (SELECT timeStart, day, timeEnd, idOfCourse, ROW_NUMBER() OVER (PARTITION BY idOfCourse ORDER BY day) AS RowNum FROM times) AS RankedTimes WHERE RowNum = 1) AS t ON c.id = t.idOfCourse;'
    pool.query(query, (err, results)=>{
      if(err){
        console.log(err)
        res.status(500).send(err)
      }else{
        const token = req.cookies.auth
        if (token === undefined) {
          res.status(202).send(results)
        } else{
          const checkRightQuery = 'SELECT session FROM users'
          pool.query(checkRightQuery, (checkerr, checkresults)=>{
            if(checkerr){
              console.log(checkerr)
              res.status(500).send(checkerr)
            }else{
              for(i in checkresults){
                if(checkresults[i].session===token){
                  const usersSession = checkresults[i].session
                  const getCourseQuery = 'SELECT signedInto FROM users WHERE session = ?'
                  const getCourseValue = [usersSession]
                  pool.query(getCourseQuery, getCourseValue, (geterr, getresults)=>{
                    if(geterr){
                      console.log(geterr)
                      res.status(500).send(geterr)
                    }else{
                      res.status(200).send({results:results, courses:getresults})
                    }
                  })
                }
              }
            }
          })
        }
      }
    })
});

app.get('/insidecourse', (req, res) => {
  const requestID = req.query.q
  if(requestID===undefined){
    res.status(422).send("Incorrect data type")
    return;
  }
  const query = 'SELECT courses.*, times.day, times.location, times.timeStart, times.timeEnd FROM courses LEFT JOIN times ON times.idOfCourse = courses.id WHERE courses.id = ?'
  const values = [requestID]
  pool.query(query, values, (err, results)=>{
    if(err){
      console.log(err)
      res.status(500).send(err)
    }else{
        const token = req.cookies.auth
        if (token===undefined) {
          res.status(300).send(results)
          
        } else {
          const getSessionQuery = 'SELECT signedInto FROM users WHERE session = ?'
          const getSessionValue = [token]
          pool.query(getSessionQuery, getSessionValue, (getSessionerr, getSessionresults)=>{
            if(getSessionerr){
              console.log(getSessionerr)
              res.status(500).send(getSessionerr)
            } else{
              if (getSessionresults.length>0) {
                res.status(200).send({signedInto:getSessionresults, data:results})
              } else {
                res.status(202).send(results)
              }
            }
          })
        }
      }
    })
});

app.post('/login', async(req, res) => {
  const b = req.body
  const username = b.username
  const unhashpass = b.password

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
      if(results.length<=0){
        res.status(401).json("User no exists")
      } else {
        bcrypt.compare(unhashpass, results[0].password, (error, samePass) => {
          if(samePass){
            const token = crypto.randomBytes(256).toString('base64');
            res.cookie('auth', token, {
              maxAge: experationTime, 
              httpOnly: true, 
              secure: true, 
              sameSite: "lax" || 'none',
            })
            const updatequery = `UPDATE users SET session = ? WHERE email = ?;`
            const updatevalues = [token, username]
            pool.query(updatequery, updatevalues, (uperr, upresults)=>{
              if(uperr){
                console.log(uperr)
                res.status(500).send(uperr)
              }else{
                res.status(200).send(upresults)
              }
            })
          } else{
            res.status(401).json("Incorrect password")
          }
        })
      }
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
        const query = 'INSERT INTO users (email, password, userName, phoneNumber, signedInto) VALUES (?, ?, ?, ?, ?)'
        const values = [b.email, hashedPass, b.username, b.number, '[]']
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

app.post('/signoff', (req, res) => {
  console.log("YEs")
  const b = req.body.data
  if(b===undefined || typeof(b)!=='number'){
    res.status(422).send("Incorrect data type")
    return;
  }

  const token = req.cookies.auth
  if(token===undefined){
    res.status(401).send("Not logged in")
    return;
  }

  const getListOfSignedIntoQuery = 'SELECT signedInto FROM users WHERE session = ?'
  const getListOfSignedIntoValue = [token]

  pool.query(getListOfSignedIntoQuery, getListOfSignedIntoValue, (getErr, getResults)=>{
    if(getErr){
      console.log(getErr)
      res.status(500).send(getErr)
    }else{
      if(getResults.length<1){
        res.status(401).send("Not logged in")
      } else {
        let listOFSignedInto = getResults[0].signedInto
        for(i in listOFSignedInto){
          if(listOFSignedInto[i].course===b){
            listOFSignedInto.splice(i, 1)
          }
        }
        listOFSignedInto = JSON.stringify(listOFSignedInto)
        const overRideQuery = 'UPDATE users SET signedInto = ? WHERE session = ?'
        const overRideValues = [listOFSignedInto, token]
        pool.query(overRideQuery, overRideValues, (err, results)=>{
          if(err){
            console.log(err)
            res.status(500).send(err)
          }else{
            res.send(results)
          }
        })
      }
    }    
  }) 
});

app.post('/signin', (req, res) => {
  const b = req.body.data
  if(b===undefined || typeof(b)!=='number'){
    res.status(422).send("Incorrect data type")
    return;
  }

  const token = req.cookies.auth
  if(token===undefined){
    res.status(401).send("Not logged in")
    return;
  }

  const getListOfSignedIntoQuery = 'SELECT signedInto FROM users WHERE session = ?'
  const getListOfSignedIntoValue = [token]

  pool.query(getListOfSignedIntoQuery, getListOfSignedIntoValue, (getErr, getResults)=>{
    if(getErr){
      console.log(getErr)
      res.status(500).send(getErr)
    }else{
      if(getResults.length<1){
        res.status(401).send("Not logged in")
      } else {
        let listOFSignedInto = getResults[0].signedInto
        for(i in listOFSignedInto){
          if(listOFSignedInto[i].course===b){
            res.status(409).send("Clashing data")
            return;
          }
        }
        listOFSignedInto.push({course: b})
        listOFSignedInto = JSON.stringify(listOFSignedInto)
        const overRideQuery = 'UPDATE users SET signedInto = ? WHERE session = ?'
        const overRideValues = [listOFSignedInto, token]
        pool.query(overRideQuery, overRideValues, (err, results)=>{
          if(err){
            console.log(err)
            res.status(500).send(err)
          }else{
            res.send(results)
          }
        })
      }
    }
  })    
});

app.get('/logout', (req, res) => {
  res.clearCookie("auth");
  res.json("Logged out");
});