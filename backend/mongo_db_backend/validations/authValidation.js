const {body} = require('express-validator');
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
    
]
const loginValidation = [
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
]
module.exports = {
    registerValidation,loginValidation
}