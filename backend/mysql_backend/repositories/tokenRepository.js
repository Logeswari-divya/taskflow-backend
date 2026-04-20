const executeQuery = require('../utils/queryHelper');

const saveRefreshToken=async(user_id,token,expiresAt)=>{
    const query = 'insert into refresh_tokens(user_id,token,expires_at) values(?,?,?)';
    return await executeQuery(query,[user_id,token,expiresAt]);
    
}
const getRefreshToken = async(token)=>{
    const query =  'Select * from refresh_tokens where token=?';
    const  rows =  await executeQuery(query,[token]);
    return rows[0];
}

const deleteRefreshToken = async(user_id)=>{
    const query =  'Delete from refresh_tokens where user_id=?';
    return await executeQuery(query,[user_id]);
}

module.exports = {
    saveRefreshToken,getRefreshToken,deleteRefreshToken
}