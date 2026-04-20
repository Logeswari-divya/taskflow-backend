const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = async(req,res,next)=>{
const authHeaders = req.headers.authorization;
   if(!authHeaders)
   {
    return res.status(401).json({msg:"No token is provided"});
   }
   const token = authHeaders.split(" ")[1];
   try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
   } catch (error) {
    if(error.name='TokenExpiredError')
    {
        return res.status(401).json({msg:"Expired token"});
    }return  res.status(403).json({msg:"Invalid or expired token"});
   }
}
module.exports = {
    auth
}