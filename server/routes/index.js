const express = require('express')

const controller = require('../controllers');
const { verify } = require('jsonwebtoken');

const router = express.Router()


//register routes
router.post('/register', controller.createUser );
router.post('/login', controller.checkUser);
router.get('/secret-route',controller.verifyJWT,controller.protectedRoute );
router.post('/update/profile',controller.verifyJWT,controller.updateProfile);
router.post('/update/Education',controller.verifyJWT,controller.updateEducation);
router.post('/update/skills',controller.verifyJWT,controller.updateSkills);
router.post('/update/experience',controller.verifyJWT,controller.updateExperience);
router.get('/getprofile',controller.verifyJWT,controller.getProfile);
router.get('/getEducation',controller.verifyJWT,controller.getEducation);
router.get('/getskills',controller.verifyJWT,controller.getSkills);
router.get('/getExperience',controller.verifyJWT,controller.getExperience);

router.get('/Admin/users',controller.verifyJWT,controller.getAllUsers);
router.delete('/Admin/users/:userid',controller.verifyJWT,controller.deleteUsers);




module.exports = router
