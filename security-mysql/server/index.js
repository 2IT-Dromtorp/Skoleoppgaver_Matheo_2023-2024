const express = require("express");
const cors = require("cors")
const http = require("http");
const {HashString, Compare} = require('./hash')
const {MongoClient} = require("mongodb");
const { type } = require("os");

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
    const database = mongodb.db("Dromtorp")
    const dromtorpUsers = database.collection("Elever")

    app.post("/api/login", (req,res)=>{
        console.log(req.body)
        res.status(200).send({a:"A"})
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
        if(typeof(password)!="string"||typeof(givenname)!="string"||typeof(surname)!="string"||typeof(schoolclass)!="string") return res.status(412).send({"message":"Nuh uh"});
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

            return res.status(201).send({"message":"Created user"});
        }
        catch(error){
            if(error.errorResponse.code===11000) return res.status(403).send({"message":"A user on that mail already exists"});
        }
    })
})

function validateEmail(email) {
    if(!email.includes("@") || !email.includes(".")) return false;
    if(email.indexOf("@")>email.indexOf(".")) return false;
    if(email.indexOf("@")===0 || email.indexOf(".")===email.length-1) return false;
    return true;
}