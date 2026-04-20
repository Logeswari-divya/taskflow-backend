const {createTask,getAllTasks,deleteTask,getTaskByUser,findTask,findTaskDB,getTaskByProjects,updateTaskStatus,updateTask}=require('../repositories/taskRepository.js');
const ApiError = require('../utils/ApiError.js');


const createTasks = async (data,projectId,user)=>{

    let {title,description,assigned_to} = data;
    if(!assigned_to)
    {
        assigned_to=user.id;
    }
    const taskId  = await createTask(title,description,projectId,assigned_to,user.id);
    return {
        message:'Task created',
        taskId
    }
}

const getTasks  = async(user,page,limit,status,assigned_to)=>{    
    if(user.role=='admin')
    {
        return await getAllTasks(page,limit,status,assigned_to);
    }
    return await getTaskByUser(user.id,page,limit,status,assigned_to);
}

const deleteTasks = async(taskId)=>{
    
    const task = await findTask(taskId);
    if(!task)
    {
        throw new ApiError(404,'Task Not Found');
    }
    return await deleteTask(taskId);
}

const getTaskByProject = async(projectId,offset,limit)=>{
    return  await getTaskByProjects(projectId,offset,limit);
}

const updateTasksStatus = async(taskId,status)=>{
    return await updateTaskStatus(taskId,status);
}
const updateTasks = async(taskId,title,description,status)=>{
    return await updateTask(taskId,title,description,status);
}
const findTaskService = async(taskId,projectId)=>{
  return await findTaskDB(taskId,projectId);
}
module.exports = {
    createTasks,getTasks,getTaskByProject,deleteTasks,updateTasksStatus,updateTasks,findTaskService
}