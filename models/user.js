const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10


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
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                console.log(hash)
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err)
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb){
    console.log(123)
    const user = this
    var token = jwt.sign(user._id.toHexString(), 'secrectToken')
    user.token = token

    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb){
    var user = this

     jwt.verify(token, 'secrectToken', function (err, decoded) {
         user.findOne({"_id" : decoded, "token" : token}, function (err, user){
             if(err) return cb(err, null);
             return cb(null, user)
         })
     })
}

const User = mongoose.model('user', userSchema)
module.exports = {User}