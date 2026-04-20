const {body} = require('express-validator');

const commentValidation = [
    body('comment').notEmpty().withMessage('Comment cannot be empty')
]
module.exports=commentValidation;