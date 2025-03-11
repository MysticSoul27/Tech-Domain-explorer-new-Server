const users = require('../models/userModel')
//jsonwebtoken
const jwt = require('jsonwebtoken')

//registeration
exports.registerController = async (req,res)=>{
    console.log('Inside Register Controller');
    console.log(req.body);
    const {username,email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user....Please login!!...")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilepic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    //res.status(200).json('Register request received')

}

//login
exports.loginController = async (req,res)=>{
    console.log("Inside login controller");
    console.log(req.body);
    const{email,password} = req.body
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,token
            })
        }else{
            res.status(404).json("Incorrect Email/Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
    //res.status(200).json('Login request received..')
}

//updateProfileController
exports.updateProfileController = async (req,res)=>{
    console.log('Inside updateProfileController');
    const {username,email,password,github,linkedin,profilepic} = req.body
    const uploadProfilePic = req.file?req.file.filename:profilepic
    const userId = req.userId
    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilepic:uploadProfilePic
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//allUsersController
exports.allUsersController = async (req,res)=>{
    console.log("Inside allUsersController");
    try {
        const allUsers = await users.find({role:"user"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
    
}