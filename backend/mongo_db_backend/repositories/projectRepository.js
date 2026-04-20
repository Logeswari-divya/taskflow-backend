const Project = require('../model/Project');
const createProject = async (name, description, created_by) => {
   return await Project.create({name,description,created_by})
}

const getProjects = async (userId) => {
    return await Project.find({created_by:userId,delete_status:0});
}

const updateProjectDB = async (projectName, projectDesc,projectId) => {
    return await Project.findByIdAndUpdate(projectId,{$set:{description:projectDesc,name:projectName}},{new:true})
}
const deleteProjectDB = async (id) => {
    return await Project.findByIdAndUpdate(id,{$set:{delete_status:1}},{new:true});
}
module.exports = { createProject, getProjects, updateProjectDB, deleteProjectDB }