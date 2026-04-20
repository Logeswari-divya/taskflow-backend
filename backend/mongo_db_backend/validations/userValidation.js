const { body } = require('express-validator');
const userValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid Email Format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters Long')
];
const userEditValidation = [
    body('name').optional().trim().notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Email is required'),
];
module.exports ={
    userValidation,userEditValidation
}