const {body} = require('express-validator');
const createTaskValidation = [
    body("title").notEmpty().withMessage('Title is required..'),
    body('description').notEmpty().withMessage('Description is required'),
    body('assigned_to').optional().isMongoId().withMessage('assigned_to must be a valid user id')
]
module.exports=createTaskValidation;