const {body} = require('express-validator');

const projectValidation = [
    body("name").notEmpty().withMessage('Project name is required'),
    body('description').notEmpty().withMessage('Project description is required')
]
module.exports = projectValidation;