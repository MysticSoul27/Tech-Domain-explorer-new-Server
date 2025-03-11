const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    profilepic:{
        type:String,
    }

})

const users = mongoose.model('users',userSchema)

module.exports = users