const express = require('express');
const router = express.Router();
const {login,register,refreshToken,logout}= require('../controllers/authController.js');
const {auth} = require('../middleware/authmiddleware');

const {registerValidation,loginValidation} = require('../validations/authValidation.js');
const validate = require('../middleware/validationMiddleware.js');
router.route('/register').post(registerValidation,validate,register);
router.route('/login').post(loginValidation,validate,login);
router.route('/logout').delete(auth,logout);
router.route('/refresh').post(refreshToken);

// router.post('/register',register);
// router.post('/login',login);

module.exports=router;