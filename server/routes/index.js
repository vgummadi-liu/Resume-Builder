const express = require('express')

const controller = require('../controllers')

const router = express.Router()


//register routes
router.post('/register', controller.createUser );
router.post('/login', controller.checkUser);
router.get('/secret-route',controller.verifyJWT,controller.protectedRoute );
router.post('/updateProfile',controller.verifyJWT,controller.updateProfile);


// router.get('/user/:id', UserCtrl.getUserById)
// router.post('/getall', UserCtrl.getAllbyId)
// router.post('/changePassword', UserCtrl.changePassword)

module.exports = router
