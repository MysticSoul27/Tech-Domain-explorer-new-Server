const mongoose = require('mongoose')

const saveCollectionSchema = new mongoose.Schema({
    techId: {
        type:String,
        required:true
    },
    techName: {
        type:String,
        required:true
    },
    techImg: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true
    }
})

const savedContributions = mongoose.model('savedContributions',saveCollectionSchema)
module.exports = savedContributions