
const db = require('./config/db.js');
const express = require('express');
const app= express();
const cors = require("cors");
require('dotenv').config();
app.use(cors({
    origin:'http://localhost:5500',
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}));
// app.options('*',cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const errorMiddleware = require('./middleware/errorMiddleware.js');
const cookieParser = require('cookie-parser');
require('./jobs/dueDateRemainder.js');
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.status(200).json({msg:'This is your first work!....'});
});
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/user',userRoutes);
app.use(errorMiddleware);
async function testDb(){
    try {
        const conn = await db.getConnection();
        conn.release();
        //console.log('Mysql connected sucessfully!...');
        const PORT=process.env.PORT;
        app.listen(PORT,(req,res)=>{
            console.log(`Server is running the port ${PORT}`);
        })
    } catch (error) {
        console.error('DB ERROR',error);
    }
} 
testDb();
