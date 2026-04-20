const executeQuery = require('../utils/queryHelper');

const createTask = async (title,task,projectId,assigned_to,created_by)=>{
    const query = 'Insert into tasks (title,description,project_id,assigned_to,created_by) values(?,?,?,?,?)';
    return await executeQuery(query,[title,task,projectId,assigned_to,created_by]);
}

const getTaskByUser = async(userId,page,limit,status,assigned_to) =>{
     let params=[];
    let offset = (page-1)*limit;
    let query = 'select * from tasks where assigned_to=? ';
    params.push(userId);
    if(status)
    {
        query+='and status=?';
        params.push(status);
    }
    if(assigned_to)
    {
        query+=' and assigned_to=?';
        params.push(assigned_to);
    }
    query+=' order by DESC ';
    query+='limit ? offset ?';
    params.push(limit,offset);
    return await executeQuery(query,params);
}
const getAllTasks  = async(page,limit,status,assigned_to)=>{
    let params=[];
    let offset = (page-1)*limit;
    let query = 'select * from tasks';
    if(status)
    {
        query+=' where status=?';
        params.push(status);
    }
    if(assigned_to)
    {
        query+=' and assigned_to=?';
        params.push(assigned_to);
    }
    query+=' ORDER by DESC ';
    query+=' LIMIT ? OFFSET ?';
    params.push(limit,offset);
    return await executeQuery(query,params);

}

const deleteTask = async(taskId)=>{    
   const query =  'delete from tasks where id=?';
   return await executeQuery(query,[taskId]);
}

const findTask = async(taskId)=>{
    const query = 'Select * from tasks where id = ? limit 1';
    return await executeQuery(query,[taskId]);
}

const getTaskByProjects = async(projectId,offset,limit)=>{
   const query = 'Select * from tasks where project_id=? ORDER BY id DESC limit ? offset ?';
   return await executeQuery(query,[projectId,limit,offset]);
}
const updateTaskStatus=async(taskId,status)=>{
    const query ='update tasks set status=? where id=?';
    return await executeQuery(query,[status,taskId]);
}

const updateTask=async(taskId,title,description,status)=>{
    const query = 'update tasks set title=?,description=?,status=? where id=?';
    return await executeQuery(query,[title,description,status,taskId]);

}
const findTaskDB = async(taskId,projectId)=>{
    const query =  'select * from tasks where id=? and project_id=? limit 1';
    return await executeQuery(query,[taskId,projectId]);

}
module.exports = {
    createTask,getAllTasks,deleteTask,getTaskByUser,findTaskDB,getTaskByProjects,findTask,updateTaskStatus,updateTask
}