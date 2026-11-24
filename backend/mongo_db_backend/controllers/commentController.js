const asyncwrapper = require("../utils/AsyncWrapper")
const {createCommentService,getCommentsByTaskService,updateCommentService,deleteCommentService} = require('../services/commentService');
const {successResponse} = require('../utils/apiResponse.js')
const createComment = asyncwrapper(async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user.id;
    const {comment} = req.body;
    //console.log('comment'+comment);
    
    const result = await createCommentService({comment,taskId,userId});
    successResponse(res,result);
});

const getCommentsByTask = asyncwrapper(async (req,res)=>{
    const taskId = req.params.taskId;
    const result = await getCommentsByTaskService(taskId);
    const response = {
        comments:result,
        loginUserId:req.user.id
    }
    successResponse(res, response);
})

const updateComment = asyncwrapper(async(req,res)=>{    
    const commentId=req.params.commentId;
    const {comment} =req.body;
    const result = await updateCommentService(comment,req.user,commentId);
    successResponse(res,result);
})

const deleteComment = asyncwrapper(async (req,res) => {
    const commentId  = req.params.commentId;
    const result = await deleteCommentService(commentId,req.user);
    successResponse(res,result);
})
module.exports = {
    createComment,getCommentsByTask,updateComment,deleteComment
}
