const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authmiddleware');
const { createUser ,editUser ,deleteUser, getUserData,getAllUser} = require('../controllers/userController.js');
const {userValidation,userEditValidation} = require('../validations/userValidation.js');
const validate = require('../middleware/validationMiddleware.js');
router.route('/').post(auth,userValidation,validate,createUser).get(auth,getAllUser);
router.route('/:id').put(auth,userEditValidation,validate,editUser).get(auth,getUserData).delete(auth,deleteUser);
module.exports = router;
