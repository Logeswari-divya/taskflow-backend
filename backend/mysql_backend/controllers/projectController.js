const {getProject,createProjects,updateProjectSer,deleteProjectSer} = require('../services/projectService');
const asyncwrapper = require('../utils/AsyncWrapper');
const {successResponse} = require('../utils/apiResponse.js')


const createProjectsCon = asyncwrapper(async(req,res)=>{    
    const result = await createProjects(req.body,req.user);
    successResponse(res,result,'Project created succesfully');
});
const getProjectsCon= asyncwrapper(async(req,res)=>{
    const projects = await getProject(req.user);
    successResponse(res,projects,'Project fetched succesfully');
});
const updateProject = asyncwrapper(async(req,res)=>{
    const result = await updateProjectSer(req.body.name,req.body.description,req.params.id);
    successResponse(res,result);
})

const deleteProject = asyncwrapper(async (req,res) => {
    const result = await deleteProjectSer(req.params.id);
    successResponse(res,result);
})
module.exports = {createProjectsCon,getProjectsCon,updateProject,deleteProject}