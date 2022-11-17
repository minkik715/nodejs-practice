const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 20
    },
    email: {
        type: String,
        trimL: true,
        maxLength: 30,
        unique: 1
    },
    password: {
        type: String,
        minLength: 4
    },
    lastName: {
        type: String,
        maxLength: 20
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: NUmber
    }
})

const user = mongoose.model('user', userSchema)
module.exports = {user}