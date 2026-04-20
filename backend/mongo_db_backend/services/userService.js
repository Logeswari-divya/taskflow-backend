const {createUserDB,editUserDB,getUserDataDB,deletUserDB, getAllUserDB}= require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const createUserService = async(data)=>{
    const {email,name,password,role}=data;
    const hashPassword = await bcrypt.hash(password,10);
    const result = await createUserDB(name,email,hashPassword,role);
    return {
        result,message:'User created Successfully..'
    }
}
const editUserService = async (data,userId) => {
    const {email,name,role}=data;
    let updatedData={email,role,name};
    if(data.password && data.password.trim()!='')
    {
        updatedData.password = await bcrypt.hash(data.password,10);
    }
    const result = await editUserDB(updatedData,userId);
    return {
        result,message:'User Updated Successfully..'
    }
}

const getUserService = async(userId)=>{
    const result = await getUserDataDB(userId);
    return {
        result,message:'User Data fetched Successfully.'
    }
}
const deleteUserService = async (userID) => {
  const result = await deletUserDB(userID);
   return {
        result,message:'User Data deleted Successfully.'
    }
}

const getAllUserService = async(page,limit,offset,search)=>{
    const result= await getAllUserDB(page,limit,offset,search);
    return {
        result,message:'User Data fetched Successfully.'
    }
}
module.exports = {
    createUserService,editUserService,getUserService,deleteUserService,getAllUserService
}
