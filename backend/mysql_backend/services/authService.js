
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {generateToken,generateRefreshToken} = require('../utils/generateToken.js');
const {saveRefreshToken,getRefreshToken} = require('../repositories/tokenRepository.js');
const { findUserByEmail, createUserDB,getUserDataDB,logoutDB } = require('../repositories/userRepository.js');
const ApiError = require('../utils/ApiError.js');
const register = async (data) => {
    const { name, email, password, role } = data;
    const existingUser = await findUserByEmail(name, email, password, role);
    if (existingUser) {
        throw new ApiError('409','User Already Exists');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userId = await createUserDB(name, email, hashPassword, role);
    return { msg: 'User created Successfully', userId };
}

const login = async (data) => {
    const { email, password } = data;
    const user = await findUserByEmail(email, password);
    if (!user) {
        throw new ApiError(401,"Invalid credentials!...");
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
        throw new ApiError(401,"Invalid credentials!...");
    }
    const accesstoken =  generateToken(user);
    const refreshtoken = generateRefreshToken(user);
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const id=user.id;
    await saveRefreshToken(id,refreshtoken,date);
    return {
        accesstoken,refreshtoken,expires:date,role:user.role
    }
}
const refreshToken = async(token)=>{
    if(!token)
    {
        throw new ApiError(401,'Token Required');
    }
    
    const result = await getRefreshToken(token);
    if (!result)
    {
        throw new ApiError(401,'Invalid refresh token');
    } 
    if(result.expires_at && (new Date(result.expires_at) < new Date()))
    {
        throw new ApiError(401,'Refresh token expired');
    }
    let decoded;
    try {
        decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new ApiError(401,"Invalid Token!...");
    }
    const userData = await getUserDataDB(decoded.id);
    if(!userData)
    {
        throw new ApiError(404,'User Not Found.');
    }
    const user = {id:decoded.id,role:userData.role};    
    const accessToken = generateToken(user);    
    return {accessToken}
}
const logoutService = async (userId) => {
    const result =  await logoutDB(userId);
    return {
        result,message:'Logged out Successfully'
    }
}
module.exports = {
    login,register,refreshToken,logoutService
}