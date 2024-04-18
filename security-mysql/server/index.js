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

const ipRequests = {};

app.use((req, res, next) => {
    const ip = req.socket.remoteAddress;
    let curRequests = ipRequests[ip];
    if (curRequests === undefined) {
        curRequests = {
            ip: ip,
            requests: {
                content: [],
                api: [],
            },
        };
        ipRequests[ip] = curRequests;
    }
    let requestType = "api";
    let maxRate = "50";
    const requests = curRequests.requests[requestType];
    const now = Date.now();
    const pushRequest = () => {
        requests.push({
            url: req.url,
            date: now,
        });
        next();
    }
    if (requests.length > 0) {
        let amount = 0;
        for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            if ((now - request.date) <= 60 * 1000) {
                amount += 1;
            }
        }
        if (amount <= maxRate) {
            pushRequest();
        } else {
            res.status(429).send('Too many requests');
        }
    } else {
        pushRequest();
    }
});

server.listen(port, () => {
    console.log(port);

    const mongodb = new MongoClient(url);
    const database = mongodb.db("Dromtorp");
    const dromtorpUsers = database.collection("Users");
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

        if(Compare(findUser.password, password)){
            const accessToken = createAccessToken(emailAfterChange, findUser.class);
            //const refreshToken = createRefreshToken(emailAfterChange, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det

            res.status(202).send({"accessToken":accessToken, "data":findUser.class});
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
        const phone = b.phone;
        const address = b.address;
        const familyMembers = b.familyMembers;
        if(typeof(password)!="string"||typeof(givenname)!="string"||typeof(surname)!="string"||typeof(schoolclass)!="string") return res.sendStatus(403);

        if(familyMembers.length>3) return res.sendStatus(412)

        const hashedPassword = HashString(password, 15)

        const emailAsString = email.split("@")[0];

        try{
            await dromtorpUsers.insertOne({
                givenName:givenname,
                surname:surname,
                email:emailAsString,
                phone:phone,
                password:hashedPassword,
                address:address,
                borrowed:[],
                kin:familyMembers,
                class:schoolclass
            })

            const accessToken = createAccessToken(emailAsString, schoolclass);
            //const refreshToken = createRefreshToken(emailAsString, findUser.class); Brukes ikke til noe enda, kan ikke nok til å bruke det
            res.status(201).send({accessToken:accessToken});
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    })

    app.get("/api/list-items", authenticateToken, async (req, res) => {        
        const q = req.query;

        const limit = q.limit;
        const limitInt = parseInt(limit);

        if(!limitInt) return res.status(404).send({"message":"The limit is not a number"});

        //jeg vil legge til at man ser de man allerede låner et annet sted, og vil fortsatt bruke denne. jeg har en ide om hvordan, men må få JWT til å fungere for å bruke det. intil det lager jeg bare en generalisert, som fungerer uten noen spesifikk brukerdata

        const listedItems = await dromtorpItems.find().sort({tool: 1}).project({_id:0}).limit(limitInt).toArray();
        if(!listedItems.length) return res.status(404).send({"message":"There is no items"});

        res.status(201).send({"data":listedItems});
    });

    app.get("/api/item-info", authenticateToken, async (req,res)=>{
        const q = req.query;
        if(!q) return res.status(404).send({"message":"Something went wrong"});

        const serialNumber = q.serialnumber;
        if(!serialNumber) return res.status(404).send({"message":"You did not send in a serial number"});

        const jwtUser = req.jwtUser;

        let item = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0}).toArray();
        if(!item.length) return res.status(404).send({"message":"There does not exist an item with that serial number"});

        if(jwtUser.class!=="LAERER" && item[0].borrowedBy && jwtUser.email !== item[0].borrowedBy){
            item[0].borrowedBy = "Someone"
        } else if(jwtUser.email === item[0].borrowedBy){
            item[0].borrowedBy = "This user"
        } else if(jwtUser!=="LAERER" && !item[0].borrowedBy){
            item[0].borrowedBy = ""
        }

        res.status(200).send({"data":item});
    });

    app.post("/api/borrow-request", authenticateToken, async (req,res)=>{
        const b = req.body; //Her kan jeg legge til blokkader mot at man kan sende inn flere requests mot samme bruker
        const serialNumber = b.serialnumber;
        if(!serialNumber) return res.status(406).send({message:"You did not send in a serial number to borrow"});

        const jwtEmail = req.jwtUser.email;
        if(!jwtEmail) return res.status(403).send({message:"Your email is not registered. Try logging in again"});

        const userTryingToBorrow = await dromtorpUsers.find({email:jwtEmail}).project({email:1,"givenName":1,surname:1,class:1}).toArray();
        if(!userTryingToBorrow.length) return res.status(404).send({message:"The user you're trying to borrow from does not exist"});

        const itemInfoToBorrow = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0,extraInfo:0}).toArray();
        if(!itemInfoToBorrow.length) return res.status(404).send({message:"The item you're trying to borrow does not exist"});
        if(itemInfoToBorrow[0].borrowedBy) return res.status(409).send({message:"Someone has already borrowed this item"});

        const prevRequest = await dromtorpRequests.find({"user.emailOfUser": jwtEmail, "item.serialNumberOfItem":serialNumber}).project({ranId:1}).toArray();
        if(prevRequest.length) return res.sendStatus(409);

        const ranID = require("crypto").randomBytes(32).toString("base64");

        try{
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
        } catch (err) {
            res.sendStatus(500);
        }
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

        if(!userData.length) return res.sendStatus(404);

        res.status(200).send({"data":userData});
    });

    app.get("/api/get-email-from-jwt", authenticateToken, (req,res) =>{
        const jwtUserEmail = req.jwtUser;
        if(!jwtUserEmail.email) return res.sendStatus(400);

        res.status(200).send({"email":jwtUserEmail.email, "sclass":jwtUserEmail.class});
    });

    app.get("/api/getusers", authenticateToken, async (req,res) => {
        const jwtUser = req.jwtUser;

        if(jwtUser.class!=="LAERER") return res.sendStatus(403);

        try {
            const users = await dromtorpUsers.find().project({_id:0, password:0}).toArray();
            if(!users.length) return res.sendStatus(500);

            res.status(200).send({"data":users})
        } catch (error) {
            return res.sendStatus(500);
            
        }        
    });

    app.post("/api/returnitem", authenticateToken, async (req,res) => {
        const jwtUser = req.jwtUser;
        const b = req.body;
        const email = b.email;
        const serialnumber = b.serialnumber;
        if(typeof(email)!=="string"||typeof(serialnumber)!=="string") return res.sendStatus(412);
        if(jwtUser.email!==email&&jwtUser.class==="LAERER") return res.sendStatus(403);

        const itemData = await dromtorpItems.find({serialNumber:serialnumber}).project({serialNumber:1}).toArray();
        if(!itemData.length) return res.sendStatus(500);

        const userData = await dromtorpUsers.find({email:email}).project({email:1}).toArray();
        if(!userData.length) return res.sendStatus(500);

        await dromtorpItems.updateOne({serialNumber:serialnumber},{$set:{borrowedBy:""}});

        await dromtorpUsers.updateOne({email:email},{$pull:{borrowed:{serialNumber:serialnumber}}});

        const itemDataafter = await dromtorpItems.find({serialNumber:serialnumber}).project({_id:0}).toArray();
        if(!itemDataafter.length) return res.sendStatus(500);

        res.status(200).send({"data":itemDataafter});
    });

    app.post("/api/create-item", authenticateToken, async (req,res)=>{
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);
        
        const b = req.body;
        const serialNumber = b.serialnumber;
        const tool = b.tool;
        const extraInfo = b.extraInfo;
        const imgUrl = b.imgUrl;

        if(!serialNumber||!tool||typeof(serialNumber)!=="string"||typeof(tool)!=="string") return res.sendStatus(412);

        try{
            await dromtorpItems.insertOne({
                serialNumber:serialNumber,
                tool:tool,
                borrowedBy:"",
                imgUrl:typeof(imgUrl)==="string"?imgUrl:"",
                extraInfo:typeof(extraInfo)==="string"?extraInfo:"",
            });;

            res.sendStatus(200);
        } catch(err){
            res.status(500).send(err);
        }
    });

    app.put("/api/edit-item", authenticateToken, async (req,res)=>{
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);
        
        const b = req.body;
        const serialNumber = b.serialnumber;
        const tool = b.tool;
        const extraInfo = b.extraInfo;
        const imgUrl = b.imgUrl;
        const oldSerial = b.oldSerial;

        if(!serialNumber||!tool||!oldSerial||typeof(serialNumber)!=="string"||typeof(oldSerial)!=="string"||typeof(tool)!=="string") return res.sendStatus(412);

        try{
            await dromtorpItems.updateOne({serialNumber:oldSerial},{$set:{
                serialNumber:serialNumber,
                tool:tool,
                imgUrl:typeof(imgUrl)==="string"?imgUrl:"",
                extraInfo:typeof(extraInfo)==="string"?extraInfo:"",
            }});;

            res.sendStatus(200);
        } catch(err){
            console.log(err)
            res.status(500).send(err);
        }
    });

    app.get("/api/item-edit-info", authenticateToken, async (req,res)=>{
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);

        const q = req.query;
        if(!q) return res.status(404).send({"message":"Something went wrong"});

        const serialNumber = q.serialnumber;
        if(!serialNumber) return res.status(404).send({"message":"You did not send in a serial number"});

        let item = await dromtorpItems.find({serialNumber:serialNumber}).project({_id:0}).toArray();
        if(!item.length) return res.status(404).send({"message":"There does not exist an item with that serial number"});

        if(jwtUser.class!=="LAERER" && item[0].borrowedBy && jwtUser.email !== item[0].borrowedBy){
            item[0].borrowedBy = "Someone"
        } else if(jwtUser.email === item[0].borrowedBy){
            item[0].borrowedBy = "This user"
        } else if(jwtUser!=="LAERER" && !item[0].borrowedBy){
            item[0].borrowedBy = ""
        }

        res.status(200).send({"data":item});
    });

    app.get("/api/user-data-for-edit", authenticateToken, async(req,res) =>{
        const jwtUser = req.jwtUser;
        const q = req.query;
        const email = q.email;

        if(jwtUser.class!=="LAERER"&&jwtUser.email!==email) return res.sendStatus(403);

        const userData = await dromtorpUsers.find({email:email}).project({_id:0,borrowed:0,password:0}).toArray();
        if(!userData.length) return res.sendStatus(412);

        res.status(200).send({"data":userData[0], "userClass":jwtUser.class});
    });

    app.put("/api/update-user-teacher", authenticateToken, async(req,res) => {
        const jwtUser = req.jwtUser;
        if(jwtUser.class!=="LAERER") return res.sendStatus(403);
        
        const b = req.body;

        const email = b.email;
        if(!validateEmail(email)) return res.status(412).send({"message":"Email is not correct"});
        
        const oldEmail = b.oldEmail;
        const givenname = b.givenName;
        const surname = b.surname;
        const schoolclass = b.class;
        const phone = b.phone;
        const address = b.address;
        const familyMembers = b.familyMembers;

        if(!checkValues(oldEmail, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(givenname, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(surname, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(schoolclass, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(phone, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(address, "string", true, false)) return res.sendStatus(412);
        if(!checkValues(familyMembers, typeof([]), false, true)) return res.sendStatus(412);

        try {
            dromtorpUsers.updateOne({email:oldEmail},
                {$set:{
                    givenName:givenname,
                    surname:surname,
                    email:email.split("@")[0],
                    phone:phone,
                    address:address,
                    kin:familyMembers,
                    class:schoolclass
                }}
            );

            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    })

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/build/index.html');
    });
})

function checkValues(data, datatype, cantBeFalse, isArrayWhichCantBeEmpty){
    if(typeof(data)!==datatype) return false;
    if(cantBeFalse&&!data) return false;
    if(isArrayWhichCantBeEmpty&!data.length) return false;
    return true;
}

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