const mongoose = require('mongoose')

const techShema = new mongoose.Schema({
    techName:{
        type:String,
        required:true,
        unique:true
    },
    learningApp:{
        type:String,
        required:true
    },
    videoArray:{
        type:[String],
        required:true
    },
    websiteArray:{
        type:[String],
        required:true
    },
    timeTaken:{
        type:String,
        required:true
    },
    challenges:{
        type:String,
        required:true
    },
    techImg:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const contributions = mongoose.model('contributions',techShema)
module.exports = contributions