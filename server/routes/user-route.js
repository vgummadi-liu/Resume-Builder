const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()


router.post('/login', UserCtrl.checkUser)
router.post('/user', UserCtrl.createUser)

// router.get('/user/:id', UserCtrl.getUserById)
// router.post('/getall', UserCtrl.getAllbyId)
// router.post('/changePassword', UserCtrl.changePassword)

module.exports = router
