const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (user)=>{
    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}

const generateRefreshToken = (user)=>{
    const token = jwt.sign({id:user.id},process.env.JWT_REFRESH_SECRET)
    return token;
}
module.exports = {
    generateRefreshToken,generateToken
}