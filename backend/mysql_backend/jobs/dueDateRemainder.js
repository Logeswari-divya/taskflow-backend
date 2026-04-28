const nodecron = require('node-cron');
const db = require('../config/db');
const sendEmail = require('../utils/sendEmail');
const ApiError = require('../utils/ApiError');

nodecron.schedule('0 9 * * *', async () => {    
    try {
        const today = new Date().toISOString().split('T')[0];
        const [tasks] = await db.query('select t.title,u.email,u.name from tasks t join users u on u.id=t.assigned_to where DATE(t.due_date)=?', [today]);
        for (const task of tasks) {
            await sendEmail('Task Due Today',`Hello ${task.name}, your task ${task.title} is due today`,task.email)
        }
    } catch (err) {
        throw new ApiError(500, err);
    }
})

