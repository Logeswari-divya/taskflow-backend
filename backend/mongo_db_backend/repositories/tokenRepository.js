const RefreshToken = require("../model/RefreshToken");

const saveRefreshToken=async(user_id,token,expiresAt)=>{
return await RefreshToken.create({user_id,token,expiresAt});
}
const getRefreshToken = async(token)=>{
    return await RefreshToken.findOne(token);
}

const deleteRefreshToken = async(user_id)=>{
    return await RefreshToken.deleteMany({user_id});
}

module.exports = {
    saveRefreshToken,getRefreshToken,deleteRefreshToken
}