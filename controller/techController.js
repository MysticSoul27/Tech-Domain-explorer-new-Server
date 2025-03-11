const contributions = require('../models/techModel')
const saveContributions = require('../models/saveContributionModel')

//addContributionController
exports.addContributionController = async (req, res) => {
    console.log("Inside addContributionController");
    const userId = req.userId
    const { techName, learningApp, videos, websites, timeTaken, challenges, techImg } = req.body
    const note = req.file ? req.file.filename : null
    console.log(userId, techName, learningApp, videos, websites, timeTaken, challenges, techImg, note);
    const videoArray = videos ? videos.split(",").filter(item => item.trim() !== "") : [];
    console.log(videoArray);
    const websiteArray = websites ? websites.split(",").filter(item => item.trim() !== "") : [];
    console.log(websiteArray);
    try {
        const existingContribution = await contributions.findOne({ techName })
        if (existingContribution) {
            res.status(406).json("You have already made a contribution for the technology with that name either edit it or add with another name...Please Upload another one")
        } else {
            const newContribution = new contributions({
                techName, learningApp, videoArray, websiteArray, timeTaken, challenges, techImg, note, userId
            })
            await newContribution.save()
            res.status(200).json(newContribution)
        }
    } catch (error) {
        res.status(401).json(error)
    }

    //res.status(200).json('Post request to add received')
}

//userContributionsController
exports.userContributionController = async (req, res) => {
    console.log("Inside userContributionController");
    const userId = req.userId
    try {
        const userApprovedContributions = await contributions.find({ userId,status:"Approved" })
        const userRejectedContributions = await contributions.find({ userId, status: "Rejected" });
        res.status(200).json({
            approved: userApprovedContributions,
            rejected: userRejectedContributions
        })
    } catch (error) {
        res.status(401).json(error)
    }

}

//homeContributionController
exports.homeContributionConroller = async (req, res) => {
    console.log("Inside homeContributionController");

    try {
        const homeContributions = await contributions.find({status: "Approved"}).limit(4)
        res.status(200).json(homeContributions)
    } catch (error) {
        res.status(401).json(error)
    }
}

//allContributionController
// exports.allContributionController = async (req, res) => {
//     console.log('Inside allContributionController');
//     const userId = req.userId
//     const searchkey = req.query.search
//     console.log(searchkey);

//     //console.log(searchkey);

//     const query = {
//         techName: {
//             $regex: searchkey, $options: 'i'
//         }
//     }

//     try {
//         const allContributions = await contributions.find(query)
//         res.status(200).json(allContributions)
//     } catch (error) {
//         res.status(401).json(error)
//     }

// }

//getContributionByIdController based on status
exports.getContributionByIdController = async (req, res) => {
    console.log("Inside getContributionByIdController");
    const id = req.params.id
    const userId = req.userId
    try {
        const contributionById = await contributions.findOne({ _id: id })
        res.status(200).json(contributionById)
    } catch (error) {
        res.status(401).json(error)
    }

}

//editController
exports.editController = async (req, res) => {
    console.log("inside edit controller");
    const id = req.params.id
    const userId = req.userId
    const { techName, learningApp, videos, websites, timeTaken, challenges, techImg, note } = req.body
    console.log(videos,websites);
    
    const reuploadedNote = req.file ? req.file.filename : note
    const videoArray = videos.split(",")
    const websiteArray = websites.split(",")
    console.log(`Videos: ${videoArray}, websites: ${websiteArray}`);
    try {
        const existingContribution = await contributions.findOne({_id:id,techName})

        const updateContribution = await contributions.findByIdAndUpdate({_id:id},{
            techName,learningApp,videoArray,websiteArray,timeTaken,challenges,techImg,note:reuploadedNote,userId
        },{new:true})
        await updateContribution.save()
        res.status(200).json(updateContribution)
    } catch (error) {
        res.status(401).json(error)
    }
}

//delete
exports.removeController = async (req,res) => {
    console.log("Inside removeController");
    const id = req.params.id
    try {
        const removedConribution = await contributions.findByIdAndDelete({_id:id})

        await saveContributions.deleteMany({techId: id})
        res.status(200).json(removedConribution)
    } catch (error) {
        res.status(401).json(error)
    }
}

//getOtherContributionController based on status
exports.getOtherContributionController = async (req,res)=>{
    console.log("Inside getOtherContributionController");
    const userId = req.userId
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        userId: { $ne: userId }, 
        techName: { $regex: searchkey, $options: "i" },
        status: "Approved" 
    }
    
    try {
        const otherContributions = await contributions.find(query)
        res.status(200).json(otherContributions)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//getContributionListController
exports.getContributionListController = async (req,res)=>{
    console.log("Inside getContributionListController")
    try {
        const contributionList = await contributions.find()
        res.status(200).json(contributionList)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//updateContributionStatusController 
exports.updateContributionStatusController = async (req,res) => {
    console.log("Inside updateContributionStatusController");
    const {id} = req.params

    const status = req.query.status

    console.log(`Id: ${id}, status:${status}`);
    try {
        const existingContribution = await contributions.findById({_id:id})
        existingContribution.status = status
        await existingContribution.save()
        res.status(200).json(existingContribution)
    } catch (error) {
        res.status(401).json(error)
    }
    
    
}