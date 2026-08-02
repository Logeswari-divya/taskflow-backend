// const taskService = require('../services/taskService');
// const createTask = async(req,res,next)=>{
//     try {
//         const result = await taskService.createTasks(req.body,req.user);
//         res.json(result);
//     } catch (error) {
//         next(error);
//     }
// }

// const getTasks = async (req,res,next)=>{
//     try {
//         const tasks = await taskService.getTasks(req.user);        
//         return res.json(tasks);
//     } catch (error) {
//         next(error);
//     }
// }

// const deleteTask = async(req,res,next)=>{
//     try {
//         await taskService.deleteTasks(req.params.id);
//         res.json({msg:"Task has been deleted successfully!..."});
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = {
//   createTask,getTasks,deleteTask
// }

//After adding async wrapper.

const { request } = require('express');
const taskService = require('../services/taskService.js');
const asyncwrapper = require('../utils/AsyncWrapper.js');
const { successResponse, errorResponse } = require('../utils/apiResponse.js')
const createTask = asyncwrapper(async (req, res) => {
    const projectId = req.params.projectId;
    const result = await taskService.createTasks(req.body, projectId, req.user);
    successResponse(res, result, "Tasks created successfully");
})

const getTasks = asyncwrapper(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || 'pending';
    const assigned_to = req.query.assigned_to || null;
    const tasks = await taskService.getTasks(req.user, page, limit, status, assigned_to);
    const data = {
        page, limit, tasks
    }
    console.log(data);

    successResponse(res, data, "Tasks fetched successfully");
})

const deleteTask = asyncwrapper(async (req, res) => {
    const data = await taskService.deleteTasks(req.params.id);
    successResponse(res, data, "Task has been deleted successfully!");
});

const getTaskByProjects = asyncwrapper(async (req, res) => {
    const projectId = req.params.projectId;
    const page=parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page-1)*limit;
    const result = await taskService.getTaskByProject(projectId,offset,limit);
    let data = {
        result, total: result.length
    }
    successResponse(res, data, "Tasks fetched successfully");
})

const updateTaskStatus = asyncwrapper(async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    //console.log(req.body);

    const task = await taskService.updateTasksStatus(taskId, status);
    successResponse(res, task, "Task updated successfully");
})

const findTask = asyncwrapper(async (req, res) => {
    const taskId = req.params.taskId;
    const projectId = req.params.projectId;
    const result = await taskService.findTaskService(taskId, projectId);
    successResponse(res, result);
})
const updateTask = asyncwrapper(async (req, res) => {
    const taskId = req.params.id;
    const { status, title, description } = req.body;
    const task = await taskService.updateTasks(taskId, title, description, status,assigned_to,due_date);
    successResponse(res, task, "Task updated successfully");
})
module.exports = {
    createTask, getTasks, deleteTask, getTaskByProjects, updateTaskStatus, updateTask, findTask
}
