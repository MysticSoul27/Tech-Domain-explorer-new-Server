const express = require('express')
//import userController
const userController = require('../controller/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const techController = require('../controller/techController')
const saveController = require('../controller/saveContributionController')
//object of Router class
const router = new express.Router()

//register path setting - http://localhost:3000/register
router.post('/register',userController.registerController)

//login-http://localhost:3000/login
router.post('/login',userController.loginController)

//add-http://localhost:3000/add
router.post('/add',jwtMiddleware,multerMiddleware.single('note'),techController.addContributionController)

//get userContributions
router.get('/user-contributions',jwtMiddleware,techController.userContributionController)

//get homeContributions
router.get('/home-contributions',techController.homeContributionConroller)

//get allContributions
router.get('/all-contributions',jwtMiddleware,techController.allContributionController)

//getContributionById
router.get('/all-contributions/:id',jwtMiddleware,techController.getContributionByIdController)

//updateUser
router.put('/update-user',jwtMiddleware,multerMiddleware.single('profilepic'),userController.updateProfileController)

//edit user
router.put('/edit-contribution/:id/edit',jwtMiddleware,multerMiddleware.single('note'),techController.editController)

//delete
router.delete('/contribution/:id/remove',jwtMiddleware,techController.removeController)

//save-contribution
router.post('/contribution/:id/save',jwtMiddleware,saveController.addToSaveContributionsController)

//all-user-saved-contribution
router.get('/all-user-saved-contribution',jwtMiddleware,saveController.getAllUserSavedContributionsController)

//remove-save-contribution
router.delete('/saved-contribution/:id/remove',jwtMiddleware,saveController.removeSavedContributionController)

//otherContributions
router.get('/other-contributions',jwtMiddleware,techController.getOtherContributionController)



module.exports = router