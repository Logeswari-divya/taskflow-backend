
const executeQuery = require('../utils/queryHelper');
const createProject = async (name, description, created_by) => {
    const query = 'insert into projects(name,description,created_by) values(?,?,?)';
    return await executeQuery(query,[name, description, created_by]);
}

const getProjects = async (userId) => {
   const query =  'select * from projects where created_by=? and delete_status=0';
   return await executeQuery(query,[userId]);
}

const updateProjectDB = async (projectName, projectDesc,projectId) => {
    const query =  'update projects set name=? ,description = ? where id=?';
    return await executeQuery(query,[projectName,projectDesc,projectId]);
}
const deleteProjectDB = async (id) => {
    const query =  'update projects set delete_status=1 where id=?';
    return await executeQuery(query,[id]);
}
module.exports = { createProject, getProjects, updateProjectDB, deleteProjectDB }