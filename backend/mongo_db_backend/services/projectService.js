const {createProject,getProjects,updateProjectDB,deleteProjectDB} = require('../repositories/projectRepository.js');


const createProjects = async(data,user)=>{
    const projectId = await createProject(data.name,data.description,user.id);
    return {
        message:"Project Created",
        projectId
    }
}

const getProject  = async (user)=>{    
    return await getProjects(user.id); 
}
const updateProjectSer = async(name,desc,id)=>{
    return await updateProjectDB(name,desc,id);
}
const deleteProjectSer = async(id)=>{
    return await deleteProjectDB(id);
}
module.exports={getProject,createProjects,updateProjectSer,deleteProjectSer}