const { validationResult } = require('express-validator');
const validate = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(404).json({
        //     success: false,
        //     error: errors.array()
        // })
        throw new ApiError(400,errors.array());
    }
    next();
}
module.exports = validate;
