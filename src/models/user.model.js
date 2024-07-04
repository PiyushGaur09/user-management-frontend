
const mongoose = require("mongoose")
// Calling Schema class 
const Schema = mongoose.Schema;

// Creating Structure of the collection 
const user_Schema = new Schema({
    userId: {
        type: String,
        default: Math.floor((Math.random() * 100000)).toString() // Generate random number as user id
    },
    userName: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        default: new Date()
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        require: true
    }
})

const register_user_Schema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    }
})

const login_user_Schema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = {
    user_Schema,
    register_user_Schema,
    login_user_Schema
}