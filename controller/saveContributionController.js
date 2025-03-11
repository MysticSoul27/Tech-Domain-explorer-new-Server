const saveContributions = require('../models/saveContributionModel')

//addToSaveContributionsController
exports.addToSaveContributionsController = async (req,res) => {
    console.log("Inside addToSaveContributionsController");
    const userId = req.userId
    const {id} = req.params //id of technology
    const {techName, learningApp, videos, websites, timeTaken, challenges, techImg, note } = req.body
    console.log(userId, techName, learningApp, videos, websites, timeTaken, challenges, techImg, note);
    const videoArray = videos ? videos.split(",").filter(item => item.trim() !== "") : [];
    console.log(videoArray);
    const websiteArray = websites ? websites.split(",").filter(item => item.trim() !== "") : [];
    console.log(websiteArray);
    try {
        const existingContribution = await saveContributions.findOne({techId:id,userId})
        if(existingContribution){
            res.status(406).json("Already you have added to your contribution collection...")
        }else{
            const newContribution = new saveContributions({
                techId:id, techName, learningApp, videoArray, websiteArray, timeTaken, challenges, techImg, note, userId
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

//getAllSavedContributionListController
exports.getAllSavedContributionListController = async (req,res) => {
    console.log("Inside getAllSavedContributionListController");
    //const userId = req.userId
    try {
        const allSavedContributions = await saveContributions.find()
        res.status(200).json(allSavedContributions)
    } catch (error) {
        res.status(401).json(error)
    }
    
}
