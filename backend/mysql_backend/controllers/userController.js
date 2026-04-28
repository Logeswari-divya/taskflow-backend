const { successResponse } = require("../utils/apiResponse");
const asyncwrapper = require("../utils/AsyncWrapper");
const {createUserService,editUserService,deleteUserService,getUserService,getAllUserService,getUserListService} = require('../services/userService.js');
const createUser=asyncwrapper(async(req,res)=>{
    const result = await createUserService(req.body);
    successResponse(res,result);
});
const editUser = asyncwrapper(async(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    
    const result = await editUserService(req.body,req.params.id);
    successResponse(res,result);
});
const deleteUser = asyncwrapper(async(req,res)=>{
    const result = await deleteUserService(req.params.id);
    successResponse(res,result);
});
const getUserData = asyncwrapper(async (req,res) => {
  
    const result = await getUserService(req.params.id);
    successResponse(res,result);
});
const getAllUser = asyncwrapper(async(req,res)=>{
     let { page=1, limit=10, search="" } = req.query;
    let offset = (parseInt(page)-1)*limit;
    const result = await getAllUserService(parseInt(page),parseInt(limit),parseInt(offset),search);
    successResponse(res,result);
})

const getUserList =asyncwrapper(async(req,res)=>{    
    const result = await getUserListService();
    successResponse(res,result);
})
module.exports = {
    createUser,editUser,deleteUser,getUserData,getAllUser,getUserList
}