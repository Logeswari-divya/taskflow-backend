const { json } = require('express');
const authService = require('../services/authService');
const {successResponse,errorResponse} = require('../utils/apiResponse.js');
const asyncwrapper = require('../utils/AsyncWrapper.js');
const register = async (req,res,next) => {
   const result = await authService.login(req.body);
    res.cookie('refreshtoken',result.refreshtoken,{
        httpOnly:true,
        secure:false,
        sameSite:'Lax',
        expires:result.expires
    })
    successResponse(res,{accesstoken:result.accesstoken,role:result.role},"Logged in successfully");
}
const login = asyncwrapper(async(req,res)=>{    
    const result = await authService.login(req.body);
    res.cookie('refreshtoken',result.refreshtoken,{
        httpOnly:true,
        secure:false,
        sameSite:'Lax',
        expires:result.expires
    })
    successResponse(res,{accesstoken:result.accesstoken,role:result.role},"Logged in successfully");
})

const refreshToken = asyncwrapper(async(req,res)=>{
    const refreshtoken =req.cookies.refreshtoken;
    const token =await authService.refreshToken(refreshtoken);
    res.json(token);
})

const logout = asyncwrapper(async(req,res)=>{
    const result =await authService.logoutService(req.user.id);
    successResponse(res,result)
});
module.exports = {
    login,register,refreshToken,logout
}
