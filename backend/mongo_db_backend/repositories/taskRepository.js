
const Task = require('../model/Task');
const Project = require('../model/Project');

const createTask = async (title, task, projectId, assigned_to, created_by,due_date) => {

      const newTask =   await Task.create({ title, description: task, project_id: projectId, assigned_to, created_by,due_date});
      await Project.findByIdAndUpdate(projectId,{
        $addToSet:{
            members:assigned_to
        }
    })
    return newTask;
}

const getTaskByUser = async (userId, page, limit, status, assigned_to) => {
    let offset = (page - 1) * limit;
    let filter = { assigned_to: userId };
    if (status) {
        filter.status = status;
    }
    return await Task.find(filter).limit(limit).skip(offset).sort({ created_at: -1 });

}
const getAllTasks = async (page, limit, status, assigned_to) => {
    let offset = (page - 1) * limit;
    return await Task.find().limit(limit).skip(offset).sort({ created_at: -1 });
}

const deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
}

const findTask = async (taskId) => {
    return await Task.findOne({ _id: taskId });
}

const getTaskByProjects = async (projectId, offset, limit) => {
    return await Task.find({ project_id: projectId }).limit(limit).skip(offset);
}
const updateTaskStatus = async (taskId, status) => {
    return await Task.findByIdAndUpdate(taskId, { $set: { status } }, { new: true })
}

const updateTask = async (projectId,taskId, title, description, status, assigned_to, due_date) => {
    
    const updateTasks= await Task.findOneAndUpdate({ _id: taskId }, { $set: { title, description, status , assigned_to, due_date } }, { new: true });
    await Project.findByIdAndUpdate(projectId,{
        $addToSet:{
            members:assigned_to
        }
    })
    return updateTasks;
}
const findTaskDB = async (taskId, projectId) => {
    return await Task.findOne({ _id: taskId, project_id: projectId });
}
module.exports = {
    createTask, getAllTasks, deleteTask, getTaskByUser, findTaskDB, getTaskByProjects, findTask, updateTaskStatus, updateTask
}
