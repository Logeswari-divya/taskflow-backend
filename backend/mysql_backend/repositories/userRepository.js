const db = require('../config/db.js');
const executeQuery = require('../utils/queryHelper');

const findUserByEmail = async (email) => {
    const query = 'Select * from users where email=?';
    const rows = await executeQuery(query,[email]);
    return rows[0];
}

const createUserDB = async (name, email, password, role) => {
    const query = 'Insert into users(name,email,password,role) values(?,?,?,?)';
    return await executeQuery(query,[name, email, password, role]);
}

const getUserDataDB = async (id) => {
    const query = 'select id,role,email from users where id=?';
    const rows =  await executeQuery(query,[id]);
    return rows[0];
}
const logoutDB = async(id)=>{
    console.log('gg'+id);
    
    const query = 'DELETE from refresh_tokens where user_id=?';
    const res = await executeQuery(query,[id]);
    console.log(res);
    return  res;
    
}
const editUserDB = async(userData,userId)=>{
    const {email,name,password,role}=userData;
    let fields=[];
    let values=[];
    if(email)
    {
        fields.push("email=?");
        values.push(email)
    }
    if(password)
    {
        fields.push("password=?");
        values.push(password);
    }
    if(name)
    {
        fields.push("name=?");
        values.push(name);
    }
    if(role)
    {
        fields.push("role=?");
        values.push(role);
    }
    values.push(userId);
    
    const query = `update users set ${fields.join(",")} where id = ? `;
    return await executeQuery(query,values);
}
const deletUserDB = async (userId) => {
    const query = 'update users set delete_status=1 where id=?';
    return await executeQuery(query,[userId]);
}
const getAllUserDB = async(page,limit,offset,search)=>{    
     const searchQuery = `%${search}%`;
     const [data]= await db.query('select * from users where name like ? or email like ? and delete_status=0 limit ? offset ?',[searchQuery,searchQuery,limit,offset]);
     const [countResult] = await db.query('select count(*) as total from users where name like ? or email like ?',[searchQuery,searchQuery])
     const totalPages = Math.ceil(countResult[0].total/limit);
     const result={data,countResult,page,limit,totalPages};
     return result;
}
const getUserListDB =async()=>{
    const [result] = await db.query('Select id,name from users where delete_status=0');    
    return result;
}
module.exports = {
    findUserByEmail, createUserDB , getUserDataDB ,logoutDB,editUserDB,deletUserDB,getAllUserDB,getUserListDB
}
