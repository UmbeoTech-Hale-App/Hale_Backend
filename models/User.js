const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        default:"unknown"
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default:"unknown"
    },
    profilePicture: {
        type: String,
        default:"unknown"
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        default:"unknown"
    },
    age: {
        type: Number,
        default: -1
    },
    height: {
        type: Number,
        default: -1
    },
    weight: {
        type: Number,
        default: -1
    },
    healthStatus: {
        type: String,
        default: "unknown"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Users", UserSchema);