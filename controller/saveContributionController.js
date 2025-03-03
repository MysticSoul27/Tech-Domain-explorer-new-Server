const saveContributions = require('../models/saveContributionModel')

//addToSaveContributionsController
exports.addToSaveContributionsController = async (req,res) => {
    console.log("Inside addToSaveContributionsController");
    const userId = req.userId
    const {id} = req.params //id of technology
    const {techName,techImg} = req.body
    try {
        const existingContribution = await saveContributions.findOne({techId:id,userId})
        if(existingContribution){
            res.status(406).json("Already you have added to your contribution collection...")
        }else{
            const newContribution = new saveContributions({
                techId:id,techName,techImg,userId
            })
            await newContribution.save()
            res.status(200).json(newContribution)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//getAllUserSavedContributionsController
exports.getAllUserSavedContributionsController = async (req,res) => {
    console.log("Inside getAllUserSavedContributionsController");
    const userId = req.userId
    try {
        const allUserSavedContributions = await saveContributions.find({userId})
        res.status(200).json(allUserSavedContributions)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//removeSavedContribution
exports.removeSavedContributionController = async (req,res)=>{
    console.log("Inside removeSavedContributionController");
    const {id} = req.params
    try {
        const removedSaveContribution = await saveContributions.findByIdAndDelete({_id:id})
        res.status(200).json(removedSaveContribution)
    } catch (error) {
        res.status(401).json(error)
    }
    
}