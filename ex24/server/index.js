require("dotenv").config();

const express = require("express");
const cors = require("cors")
const app = express();
const path = require("node:path");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

const port = 8080;

saltRounds = 12;

app.listen(port, async () => {
    console.log(port);

    const mongo = await MongoClient.connect(process.env.MONGO_URI);
    const db = mongo.db("BallIl");
    const sportsCollection = db.collection("Sports");
    const usersCollection = db.collection("Users");
    const requestUsersCollection = db.collection("Request");
    const tournamentsCollection = db.collection("Tournaments");

    await usersCollection.updateOne({email:process.env.ADMIN_EMAIL}, {$set:{email:process.env.ADMIN_EMAIL, password:process.env.ADMIN_PASS}}, {upsert: true});

    app.get("/sport-info", async (req, res) => {
        const { sport } = req.query;
        if (!sport || typeof (sport) !== "string") return res.sendStatus(400);

        const data = await sportsCollection.findOne({ name: sport }, { projection: { _id: 0 } });
        if (!data||!data.name) return res.status(500).send(`${sport} does not exist`);

        res.status(200).json(data);
    });

    app.post("/api/send-request", authenticateToken, async (req, res) => {
        const jwtEmail = req.jwtUser.email;
        const { sport } = req.body;
        if(!sport) return res.status(400).json("The data you sent in did not match what the server wanted");

        const userArray = await usersCollection.find({email:jwtEmail}).project({domainEmails:1, firstName:1, lastname:1, yearBorn:1}).toArray();
        
        const user = userArray[0];
        const domainEmail = user.firstName.substring(0,3).toLowerCase() + user.lastname.substring(0,3).toLowerCase() + sport.substring(0,3).toLowerCase()+"@ballil.local";
        
        if(userArray[0]&&userArray[0].domainEmails.includes(domainEmail)) return res.status(400).json("Du er allerede meldt inn i denne gruppen");

        const arrayOfFoundUsersOnSameMailRequest = await requestUsersCollection.find({email:jwtEmail, domainEmails:domainEmail}).project({domainEmails:1}).toArray();
        console.log(arrayOfFoundUsersOnSameMailRequest)
        if(arrayOfFoundUsersOnSameMailRequest.length) return res.status(400).json("Du har allerede sendt en søknad om å være med i gruppen");
        
        try{
            await requestUsersCollection.insertOne({
                firstName:user.firstName,
                lastname:user.lastname,
                email:jwtEmail,
                yearBorn:user.yearBorn,
                domainEmails:domainEmail
            });

            res.status(200).json("En søknad om å bli med i gruppen har blitt sendt");
        }
        catch(err){
            return res.status(500).json("Noe gikk galt når serveren prøvde å legge informasjonen inn i databasen");
        }
    });

    app.post("/api/create-user", async (req,res)=>{
        const { firstName, lastname, email, phone, address, city, yearBorn } = req.body;
        if(!firstName||!lastname||!email||!phone||!address||!city||!yearBorn) return res.status(400).json("Noe av dataen du skulle sende inn manglet");

        const preusers = await usersCollection.findOne({email:email});
        if(preusers) return res.status(409).json("En bruker finnes allerede på denne adressen")

        try{
            await usersCollection.insertOne({
                firstName,
                lastname,
                email,
                phone,
                address,
                city,
                yearBorn,
                domainEmails:[]
            });

            res.status(201).json(createAccessToken(email));
        }catch(err){
            console.log(err);
            res.status(500).json("Noe gikk galt i serveren. Prøv på nytt senere");
        }
    });

    app.get("/api/tournaments", async (req,res)=> {
        const data = await tournamentsCollection.find().project({_id:0}).toArray();
        if(!data||!data.length) return res.sendStatus(500);
        res.status(200).json(data);
    });
    app.get("/api/get-sports", async (req,res)=>{
        const data = await sportsCollection.find().project({_id:0}).toArray();
        if(!data||!data.length) return res.sendStatus(500);
        res.status(200).json(data);
    });

    app.post("/api/login", async (req,res)=>{
        const {email, password} = req.body;
        if(!email||!password) return res.status(400).json("Noe av det du skrev ble feil");

        const user = await usersCollection.find({email:email}).project({password:1}).toArray();
        if(!user.length) return res.status(400).json("Det er ingen bruker på denne emailen");

        const hashedPass = user[0].password;
        if(!await bcrypt.compare(password, hashedPass)) return res.status(403).json("Feil passord");

        res.status(200).json(createAccessToken(email));
    });

    app.get("/api/get-requests", authenticateTokenForAdminRights, async (req,res)=>{
        const data = await requestUsersCollection.find({}).project({_id:0}).toArray();
        if(!data||!data.length) return res.sendStatus(500);
        res.status(200).json(data);
    });

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/build/index.html');
    });
});

function authenticateTokenForAdminRights(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err||user.email!=="admin@ballil.local") return res.sendStatus(401);
        req.jwtUser = user;
        next();
    })
}

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

function createAccessToken(email) {
    return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}