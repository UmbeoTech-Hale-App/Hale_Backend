const express = require('express')
const router = express.Router();

const User = require('../models/User')

let AUTH_TOKEN = "abcd"
// check authtoken from headers 
// if matches then proceed with request

// signup
// we get email and password 
// email authentic checked in app so directly login the user and return the user object to app

// login
// we get email and password 
// check if exists in db then return yes / no accordingly

router.get('/test', (req, res) => {

    // if(req.query.age==undefined)
    // {
    //     res.send("undefined")
    // }
    // else
    // {
    //     res.send(req.query.age)
    // }

})

router.get('/login', async (req, res) => {

    let authToken = req.headers.authtoken;

    console.log("LOGIN REQ")

    if (authToken == AUTH_TOKEN) {

        let email = req.query.email;
        let password = req.query.password;

        await User.find({ "email": email, "password": password })
            .then((doc) => {
                if (doc.length == 1)
                    res.json(doc[0])
                else {
                    res.sendStatus(409)
                    // res.json({ "error": "invalid credentials" })
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                // res.json({ "error": err })
            });
    }
    else {
        res.sendStatus(400)
        // res.json({ "error": "invalid token" })
    }
})


router.post('/signup', async (req, res) => {

    console.log("SIGNUP POST REQ")

    let authToken = req.headers.authtoken;
    console.log(req.headers.authtoken)

    // console.log(req.headers)
    // console.log(req.query)

    // console.log("----------------------")

    // console.log("req.query.user",req.query.user)

    // console.log("----------------------")

    // // console.log("req.body",req.body)

    // console.log("----------------------")

    if (authToken == AUTH_TOKEN) {

        console.log(req.query.password)
        console.log(req.query.email)

        let e = req.query.email;
        let p = req.query.password;

        const users = await User.find({ "email": e });
        if (users.length > 0) {
            res.sendStatus(409)
            // res.json({ "error": "already_registered" });
            return;
        }
        

        console.log("1")
        const user = new User({
            email: req.query.email,
            password: req.query.password,
            phoneNumber: req.query.phoneNumber == undefined ? "unknown" : req.query.phoneNumber,
            profilePicture: req.query.profilePicture == undefined ? "unknown" : req.query.profilePicture,
            height: req.query.height == undefined ? -1 : req.query.height,
            weight: req.query.weight == undefined ? -1 : req.query.weight,
            age: req.query.age == undefined ? -1 : req.query.age,
            healthStatus: req.query.healthStatus == undefined ? "unknown" : req.query.healthStatus,
            gender: req.query.gender == undefined ? "unknown" : req.query.gender
        });

        console.log(user)

        try {
            const savedUser = await user.save();
            console.log("3")
            res.json(savedUser)
        }
        catch (err) {
            console.log("4")
            res.sendStatus(500)
            // res.json({ "error": err })
        }
    }
    else {
        res.sendStatus(400)
        // res.json({ "error": "invalid token" })
    }

});

router.post('/update', async (req, res) => {
    let authToken = req.headers.authtoken;

    console.log("UPDATE REQ")

    if (authToken == AUTH_TOKEN) {

        let email = req.query.email;
        let password = req.query.password;

        await User.find({ "email": email, "password": password })
            .then(async (doc) => {

                console.log(doc.length)

                if (doc.length == 1) {

                    console.log(doc[0]._id)

                    const user = new User({
                        email: req.query.email,
                        password: req.query.password,
                        phoneNumber: req.query.phoneNumber == undefined ? doc[0].phoneNumber : req.query.phoneNumber,
                        profilePicture: req.query.profilePicture == undefined ? doc[0].profilePicture : req.query.profilePicture,
                        height: req.query.height == undefined ? doc[0].height : req.query.height,
                        weight: req.query.weight == undefined ? doc[0].weight : req.query.weight,
                        age: req.query.age == undefined ? -doc[0].age : req.query.age,
                        healthStatus: req.query.healthStatus == undefined ? doc[0].healthStatus : req.query.healthStatus,
                        gender: req.query.gender == undefined ? doc[0].gender : req.query.gender,
                        _id: doc[0]._id
                    });

                    await User.updateOne(
                        { _id: doc[0]._id },
                        {
                            $set: {
                                phoneNumber: req.query.phoneNumber == undefined ? "unknown" : req.query.phoneNumber,
                                profilePicture: req.query.profilePicture == undefined ? "unknown" : req.query.profilePicture,
                                height: req.query.height == undefined ? -1 : req.query.height,
                                weight: req.query.weight == undefined ? -1 : req.query.weight,
                                age: req.query.age == undefined ? -1 : req.query.age,
                                healthStatus: req.query.healthStatus == undefined ? "unknown" : req.query.healthStatus,
                                gender: req.query.gender == undefined ? "unknown" : req.query.gender
                            }
                        }
                    ).then((doc) => {
                        res.json(doc)
                    }).catch((err) => {
                        // MongoDB Error
                        res.status(500).send({ "error": err })
                        // res.json({ "error": err })
                    })
                }
                else {
                    //conflict
                    res.sendStatus(409)
                    // res.json({ "error": "invalid credentials" })
                }
            })
            .catch((err) => {
                // MongoDB error
                res.sendStatus(500)
                // res.json({ "error": err })
            });
    }
    else {
        res.sendStatus(400)
        // res.json({ "error": "invalid token" })
    }
});

router.get('/', async (req, res) => {
    // res.sendStatus(404);
    try {
        const users = await User.find();
        console.log(users.length)
        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.json({ message: e });
    }
});


module.exports = router