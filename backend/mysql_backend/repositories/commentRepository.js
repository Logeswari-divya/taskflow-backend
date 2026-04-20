
const executeQuery = require('../utils/queryHelper');
const createCommentDB = async (data) => {
    const { comment, taskId, userId } = data;
    const query = 'Insert into comments(task_id,user_id,comment) values(?,?,?)';
    return await executeQuery(query,[taskId, userId, comment]);
}

const getCommentsByTaskDB = async (taskId) => {
    const query = 'Select comments.*,users.name from comments join users on users.id=comments.user_id where task_id=? order by comments.id desc';
    return await executeQuery(query,[taskId]);
}
const updateCommentDB = async (comment, userId, commentId) => {
    const query =  'update comments set comment=? where id=? and user_id=?';
    return await executeQuery(query,[comment, commentId, userId]);
}
const deleteCommentDB = async (commentId, userId) => {
    const query = 'Delete from comments where id=? and user_id=?';
    return await executeQuery(query,[commentId, userId]);
}
module.exports = {
    createCommentDB, getCommentsByTaskDB, updateCommentDB,deleteCommentDB
}