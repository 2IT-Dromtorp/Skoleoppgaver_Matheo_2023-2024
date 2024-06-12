require("dotenv").config();

const express = require("express");
const cors = require("cors")
const app = express();
const path = require("node:path");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

const port = 8080;

app.listen(port, async () => {
    console.log(port);

    const mongo = await MongoClient.connect(process.env.MONGO_URI);
    const db = mongo.db("BallIl");
    const sportsCollection = db.collection("Sports");
    const usersCollection = db.collection("Users");
    const tournamentsCollection = db.collection("Tournaments");

    app.get("/sport-info", async (req, res) => {
        const { sport } = req.query;
        if (!sport || typeof (sport) !== "string") return res.sendStatus(400);

        const data = await sportsCollection.findOne({ name: sport }, { projection: { _id: 0 } });
        if (!data||!data.name) return res.status(500).send(`${sport} does not exist`);

        res.status(200).json(data);
    });

    app.post("/api/send-request", async (req, res) => {
        const { firstName, lastname, email, phone, address, city, yearBorn, sport } = req.body;
        if(!firstName||!lastname||!email||!phone||!address||!city||!yearBorn||!sport) return res.status(400).json("The data you sent in did not match what the server wanted");

        const domainEmail = firstName.substring(0,3).toLowerCase() + lastname.substring(0,3).toLowerCase() + sport.substring(0,3).toLowerCase()+"@ballil.local";

        const arrayOfFoundUsersOnSameMail = await usersCollection.find({email:email}).project({domainEmails:1}).toArray();
        console.log(arrayOfFoundUsersOnSameMail[0])
        if(arrayOfFoundUsersOnSameMail[0]&&arrayOfFoundUsersOnSameMail[0].domainEmails.includes(domainEmail)) return res.status(400).json("Du er allerede meldt inn i denne gruppen");
        else if(arrayOfFoundUsersOnSameMail[0]&&arrayOfFoundUsersOnSameMail.length){
            await usersCollection.updateOne({email:email},{$push:{domainEmails:domainEmail}});
            return res.status(200).json("Du ble lagt til i gruppen");
        }
        try{
            await usersCollection.insertOne({
                firstName,
                lastname,
                email,
                phone,
                address,
                city,
                yearBorn,
                domainEmails:[domainEmail]
            });

            res.status(200).json("Du ble lagt til i gruppen");
        }
        catch(err){
            return res.status(500).json("Noe gikk galt når serveren prøvde å legge informasjonen inn i databasen");
        }
        
    });

    app.get("/api/tournaments", async (req,res)=> {
        const data = await tournamentsCollection.find().project({_id:0}).toArray();
        if(!data||!data.length) return res.sendStatus(500);
        res.status(200).json(data);
    });

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/build/index.html');
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.jwtUser = user;
        next();
    })
}

function createAccessToken(email, schoolClass) {
    return jwt.sign({ email: email, class: schoolClass }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}