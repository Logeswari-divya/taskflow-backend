const {getCommentsByTaskDB,createCommentDB,updateCommentDB,deleteCommentDB} = require('../repositories/commentRepository');
const ApiError = require('../utils/ApiError.js');

const createCommentService = async (data) => {
    const result = await createCommentDB(data);
    return {
        message: `Comment has been created`,
        result
    }
}
const getCommentsByTaskService=async(taskId)=>{
    return await getCommentsByTaskDB(taskId);
}

const updateCommentService =async(comment,user,commentId)=>{
    const result = await updateCommentDB(comment,user.id,commentId);
    if(result.affectedRows===0)
    {
        throw new ApiError(404,"Comment not found!...");
    }
    return {
        message:'Comment has been updated successfully',result
    }
}

const deleteCommentService = async(commentId,user)=>{
    const result = await deleteCommentDB(commentId,user.id);
    if(result.affectedRows==0)
    {
        throw new ApiError(404,"Comment not found!...");
    }
    return {
        message:'Comment has been deleted successfully!..',result
    }
}
module.exports={
    createCommentService,getCommentsByTaskService,updateCommentService,deleteCommentService
}
