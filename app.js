const path = require("path");
const express = require("express"); //
const morgan = require("morgan");// morgan, a 3rd-party app to watch logs of server
const bodyParser = require("body-parser");// a 3rd-party app for parsing
const cors = require("cors");// a 3rd-party app for solving cross server request problems of public api
const mongoose = require("mongoose") // a moodule to work with mongoodb
//importing  routers
const contactRoute = require('./api/route/contacts');
const userRoute = require("./api/route/user") 

const app = express();

//Now using middlewire function
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//using router for dealing routes
app.use('/api/contacts', contactRoute) ; 
app.use("/api/users", userRoute);

//Setting my template engine for pug
app.set('view engine', 'pug');

//doing all up works


// connecting with mongodb
mongoose.connect('mongodb://localhost:27017/contacts-db', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (err)=>{
    console.log(err);
});
db.once('open', () =>{
    console.log("Database connection establish");
})


//now render a pug file
app.get("/", (req,res)=>{
    res.status(200).render('index')
});
// simple post method
app.post("/ap/contacts", (req,res) => {
    res.json({
        "message": "Hello, How are You"
    })
});

//doing a production level housekeeping
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running at: "+ PORT));