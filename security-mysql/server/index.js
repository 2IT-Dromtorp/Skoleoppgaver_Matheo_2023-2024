require("dotenv").config();

const express = require("express");
const cors = require("cors")
const http = require("http");
const {HashString, Compare} = require('./hash')
const {MongoClient} = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

server.listen(port, () => {
    console.log(port);

    const mongodb = new MongoClient(url);
    const database = mongodb.db("Dromtorp");
    const dromtorpUsers = database.collection("Elever");
    const dromtorpItems = database.collection("Items");
    // const dromtorpRefreshTokens = database.collection("Items"); For en del av dette som kommer senere en gang

    app.post("/api/login", async (req,res)=>{
        const b = req.body;
        if(!b) return;

        const email = b.email;
        if(!validateEmail(email)) return res.status(412).send({"message":"Entered email is not a valid Email"});
        
        const password = b.password;
        if(typeof(password)!="string") return res.status(412).send({"message":"Nuh uh"});
        //Spør Andreas hvordan han hadde error handlet dette. Om du leser dette, hei andreas, hit me up

        const findUser = await dromtorpUsers.findOne({"email":email})
        if(!findUser) return;

        if(Compare(findUser.password, password)){
            const accessToken = createAccessToken(email, findUser.class);
            //const refreshToken = createRefreshToken(email, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det

            res.status(202).send({accessToken:accessToken});
        } 
        else res.status(401).send({"message":"Wrong Email or Password"})
    })

    app.post("/api/createuser", async (req,res)=>{
        const b = req.body;
        if(!b) return;

        const email = b.email;
        if(!validateEmail(email)) return res.status(412).send({"message":"Email is not correct"});
        
        const password = b.password;
        const givenname = b.givenname;
        const surname = b.surname;
        const schoolclass = b.schoolclass;
        if(typeof(password)!="string"||typeof(givenname)!="string"||typeof(surname)!="string"||typeof(schoolclass)!="string") return res.status(403).send({"message":"Nuh uh"});
        //Spør Andreas hvordan han hadde error handlet dette. Om du leser dette, hei andreas, hit me up

        const hashedPassword = HashString(password, 15)
        //errorhandle hash??!?!?!?!?

        try{
            await dromtorpUsers.insertOne({
                "given-name":givenname,
                surname:surname,
                email:email,
                phone:"",
                password:hashedPassword,
                address:"",
                borrowed:[],
                kin:[],
                class:schoolclass
            })

            const accessToken = createAccessToken(email, schoolclass);
            //const refreshToken = createRefreshToken(email, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det
            res.status(202).send({accessToken:accessToken});
        }
        catch(error){
            if(error.errorResponse.code===11000) return res.status(403).send({"message":"A user on that mail already exists"});
        }
    })

    app.get("/api/list-items", authenticateToken, async (req, res) => {
        const jwtUser = req.jwtUser;
        
        const q = req.query;

        const limit = q.limit;
        const limitInt = parseInt(limit);

        if(!limitInt) return res.status(404).send({"message":"The limit is not a number"});

        //jeg vil legge til at man ser de man allerede låner et annet sted, og vil fortsatt bruke denne. jeg har en ide om hvordan, men må få JWT til å fungere for å bruke det. intil det lager jeg bare en generalisert, som fungerer uten noen spesifikk brukerdata

        const listedItems = await dromtorpItems.find().project({_id:0}).limit(limitInt).toArray();

        if(!listedItems.length) return res.status(404).send({"message":"There is no items"});

        res.status(201).send({"data":listedItems});
    });

    app.get("/api/item-info", async (req,res)=>{
        const q = req.query;
        if(!q) return res.status(404).send({"message":"Something went wrong"});

        const serialNumber = q.serialnumber;
        if(!serialNumber) return res.status(404).send({"message":"You did not send in a serial number"});

        const item = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0}).toArray();

        if(!item.length) return res.status(404).send({"message":"There does not exist an item with that serial number"});

        res.status(200).send({"data":item});
    });

    app.post("/api/borrow-request", (req,res)=>{
        const b = req.body;
    })

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if( token == null ) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if( err ) return res.sendStatus(403);
        req.jwtUser = user; 
        next();
    })
}

function createAccessToken(email, schoolClass){
    return jwt.sign({email:email,class:schoolClass}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
}

function createRefreshToken(email, schoolClass){
    return jwt.sign({email:email,class:schoolClass}, process.env.REFRESH_TOKEN_SECRET);
}

function validateEmail(email) {
    if(!email.includes("@") || !email.includes(".")) return false;
    if(email.indexOf("@")>email.indexOf(".")) return false;
    if(email.indexOf("@")===0 || email.indexOf(".")===email.length-1) return false;
    return true;
}