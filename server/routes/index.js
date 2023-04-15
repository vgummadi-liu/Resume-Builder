const express = require('express')

const controller = require('../controllers')

const router = express.Router()


//register routes
router.post('/register', controller.createUser );
router.post('/login', controller.checkUser);
router.post('/secret-route',controller.protectedRoute );


// router.get('/user/:id', UserCtrl.getUserById)
// router.post('/getall', UserCtrl.getAllbyId)
// router.post('/changePassword', UserCtrl.changePassword)

module.exports = router
