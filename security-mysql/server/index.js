require("dotenv").config();

const express = require("express");
const cors = require("cors")
const http = require("http");
const {HashString, Compare} = require('./hash')
const {MongoClient} = require("mongodb");
const jwt = require("jsonwebtoken");
const { constants } = require("buffer");

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
    const dromtorpRequests = database.collection("Requests");
    // const dromtorpRefreshTokens = database.collection("Items"); For en del av dette som kommer senere en gang


    app.post("/api/login", async (req,res)=>{
        const b = req.body;
        if(!b) return;

        const email = b.email;
        if(!validateEmail(email)) return res.status(412).send({"message":"Entered email is not a valid Email"});
        
        const password = b.password;
        if(typeof(password)!="string") return res.status(412).send({"message":"Nuh uh"});

        const emailAfterChange = email.split("@")[0];

        const findUserArray = await dromtorpUsers.find({"email":emailAfterChange}).project({_id:0}).toArray();
        if(!findUserArray.length) return res.sendStatus(409);
        const findUser = findUserArray[0];
        console.log(findUser.password)

        console.log(findUser.password, password)

        if(Compare(findUser.password, password)){
            const accessToken = createAccessToken(emailAfterChange, findUser.class);
            //const refreshToken = createRefreshToken(emailAfterChange, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det

            res.status(202).send({accessToken:accessToken});
        } 
        else res.status(403).send({"message":"Wrong Email or Password"})
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
        if(typeof(password)!="string"||typeof(givenname)!="string"||typeof(surname)!="string"||typeof(schoolclass)!="string") return res.sendStatus(403);

        const hashedPassword = HashString(password, 15)

        const emailAsString = email.split("@")[0];

        try{
            await dromtorpUsers.insertOne({
                givenName:givenname,
                surname:surname,
                email:emailAsString,
                phone:"",
                password:hashedPassword,
                address:"",
                borrowed:[],
                kin:[],
                class:schoolclass
            })

            const accessToken = createAccessToken(emailAsString, schoolclass);
            //const refreshToken = createRefreshToken(emailAsString, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det
            res.status(201).send({accessToken:accessToken});
        }
        catch(error){
            console.log(error);
        }
    })

    app.get("/api/list-items", authenticateToken, async (req, res) => {        
        const q = req.query;

        const limit = q.limit;
        const limitInt = parseInt(limit);

        if(!limitInt) return res.status(404).send({"message":"The limit is not a number"});

        //jeg vil legge til at man ser de man allerede låner et annet sted, og vil fortsatt bruke denne. jeg har en ide om hvordan, men må få JWT til å fungere for å bruke det. intil det lager jeg bare en generalisert, som fungerer uten noen spesifikk brukerdata

        const listedItems = await dromtorpItems.find().project({_id:0}).limit(limitInt).toArray();

        if(!listedItems.length) return res.status(404).send({"message":"There is no items"});

        res.status(201).send({"data":listedItems});
    });

    app.get("/api/item-info", authenticateToken, async (req,res)=>{
        const q = req.query;
        if(!q) return res.status(404).send({"message":"Something went wrong"});

        const serialNumber = q.serialnumber;
        if(!serialNumber) return res.status(404).send({"message":"You did not send in a serial number"});

        const item = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0}).toArray();

        if(!item.length) return res.status(404).send({"message":"There does not exist an item with that serial number"});

        res.status(200).send({"data":item});
    });

    app.post("/api/borrow-request", authenticateToken, async (req,res)=>{
        const b = req.body; //Her kan jeg legge til blokkader mot at man kan sende inn flere requests mot samme bruker
        const serialNumber = b.serialnumber;
        if(!serialNumber) res.status(406).send({message:"You did not send in a serial number to borrow"});

        const jwtEmail = req.jwtUser.email;
        if(!jwtEmail) res.status(403).send({message:"Your email is not registered. Try logging in again"});

        const userTryingToBorrow = await dromtorpUsers.find({email:jwtEmail}).project({email:1,"givenName":1,surname:1,class:1}).toArray();
        if(!userTryingToBorrow.length) res.status(404).send({message:"The item you're trying to borrow from does not exist"});

        const itemInfoToBorrow = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0,extraInfo:0}).toArray();
        if(!itemInfoToBorrow.length) res.status(404).send({message:"The item you're trying to borrow does not exist"});
        if(itemInfoToBorrow[0].borrowedBy) res.status(409).send({message:"Someone has already borrowed this item"});

        const ranID = require("crypto").randomBytes(32).toString("base64");

        await dromtorpRequests.insertOne({
            "ranId":ranID,
            "item":{
                serialNumberOfItem:itemInfoToBorrow[0].serialNumber, 
                toolOfItem:itemInfoToBorrow[0].tool
            }, 
            "user":{
                "emailOfUser":jwtEmail, 
                "givenName":userTryingToBorrow[0].givenName,
                "surname":userTryingToBorrow[0].surname, 
                "class":userTryingToBorrow[0].class
            }
        })

        res.sendStatus(200);
    })

    app.get("/api/get-requests", authenticateToken, async (req,res)=>{
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);


        const requestsArray = await dromtorpRequests.find().project({_id:0}).toArray();
        res.status(200).send({"data":requestsArray});
    })

    app.post("/api/accept-request", authenticateToken, async (req,res)=> {
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);

        const b = req.body;
        const id = b.id;
        if(!id) return res.sendStatus(412);

        const requestInArray = await dromtorpRequests.find({ranId:id}).toArray();
        if(!requestInArray.length) return res.sendStatus(400);
        const request = requestInArray[0];

        const doesUserExist = await dromtorpUsers.find({email:request.user.emailOfUser}).toArray();
        if(!doesUserExist.length) return res.sendStatus(400);

        const doesItemExist = await dromtorpItems.find({serialNumber:request.item.serialNumberOfItem}).toArray();
        if(!doesItemExist.length) return res.sendStatus(400);

        try{
            await dromtorpUsers.updateOne(
                {email:request.user.emailOfUser},
                {$push:{borrowed:{serialNumber:request.item.serialNumberOfItem, tool:request.item.toolOfItem}}}
            );
    
            await dromtorpItems.updateOne(
                {serialNumber:request.item.serialNumberOfItem},
                {$set:{borrowedBy:request.user.emailOfUser}}
            );
    
            await dromtorpRequests.deleteOne({ranId:id});
    
            const requestAfterChange = await dromtorpRequests.find().project({_id:0}).toArray();
            res.status(200).send({"data":requestAfterChange});    
        } catch(err){
            console.log(err);
            const requestAfterChange = await dromtorpRequests.find().project({_id:0}).toArray();
            res.status(501).send({"data":requestAfterChange,"message":"Something falied in your request"});    
        }
        
    })

    app.post("/api/deny-request", authenticateToken, async (req,res)=> {
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);

        const b = req.body;
        const id = b.id;
        if(!id) return res.sendStatus(412);

        const requestInArray = await dromtorpRequests.find({ranId:id}).toArray();
        if(!requestInArray.length) return res.sendStatus(400);
        const request = requestInArray[0];
        try{
            await dromtorpRequests.deleteOne({ranId:id});

            const requestAfterChange = await dromtorpRequests.find().project({_id:0}).toArray();
            res.status(200).send({"data":requestAfterChange});    
        } catch(err){
            console.log(err);
            const requestAfterChange = await dromtorpRequests.find().project({_id:0}).toArray();
            res.status(501).send({"data":requestAfterChange,"message":"Something falied in your request"});    
        }
    });

    app.get("/api/get-user-info", authenticateToken, async (req,res)=> {
        const jwtUser = req.jwtUser;
        const q = req.query;
        const email = q.email;

        if(jwtUser.class!=="LAERER"&&jwtUser.email!==email) return res.sendStatus(403);

        const userData = await dromtorpUsers.find({email:email}).project({_id:0, password:0}).toArray();
        console.log(userData);

        if(!userData.length) res.sendStatus(404);

        res.status(200).send({"data":userData});
    });
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if( token == null ) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if( err ) return res.sendStatus(401);
        req.jwtUser = user; 
        next();
    })
}

function createAccessToken(email, schoolClass){
    return jwt.sign({email:email,class:schoolClass}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
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