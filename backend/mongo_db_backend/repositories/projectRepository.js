const Project = require('../model/Project');
const Task = require('../model/Task');

const createProject = async (name, description, created_by) => {
   return await Project.create({name,description,created_by})
}

const getProjects = async (userId) => {
   const createdById = Project.schema.path('created_by').cast(userId);
    const assignedToId = Task.schema.path('assigned_to').cast(userId);

    const result = await Project.aggregate([
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'project_id',
                as: 'tasks'
            }
        },
        {
            $match: {
                delete_status: 0,
                $or: [
                    { created_by: createdById },
                    { 'tasks.assigned_to': assignedToId }
                ]
            }
        }
    ]);
    return result;
}

const updateProjectDB = async (projectName, projectDesc,projectId) => {
    return await Project.findByIdAndUpdate(projectId,{$set:{description:projectDesc,name:projectName}},{new:true})
}
const deleteProjectDB = async (id) => {
    return await Project.findByIdAndUpdate(id,{$set:{delete_status:1}},{new:true});
}
module.exports = { createProject, getProjects, updateProjectDB, deleteProjectDB }
