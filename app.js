const express = require("express")

const app = express();

const mongoose = require("mongoose")
require('dotenv/config')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);


app.get('/', (req, res) => {
    res.send("We are Running");
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>{
        console.log("Connected to DB")
        console.log(err)
    }
);

console.log(process.env.PORT)
app.listen(process.env.PORT || 5000);


// https://mysterious-fortress-61725.herokuapp.com/