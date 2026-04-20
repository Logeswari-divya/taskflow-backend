const Comment = require('../model/Comment');

const createCommentDB = async (data) => {
    const { comment, taskId, userId } = data;
    return await Comment.create({comment,task_id:taskId,user_id:userId});
}

const getCommentsByTaskDB = async (taskId) => {
    return await Comment.find({task_id:taskId}).populate('user_id','name').sort({created_at:-1});
}

const updateCommentDB = async (comment, userId, commentId) => {
    return await Comment.findOneAndUpdate({user_id:userId,_id:commentId},{$set:{comment}},{new:true})
}

const deleteCommentDB = async (commentId, userId) => {
    return await Comment.findOneAndDelete({_id:commentId,user_id:userId})
}

module.exports = {
    createCommentDB, getCommentsByTaskDB, updateCommentDB,deleteCommentDB
}