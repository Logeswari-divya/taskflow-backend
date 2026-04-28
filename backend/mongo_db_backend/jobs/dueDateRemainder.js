const nodecron = require('node-cron');
const db = require('../config/db.js');
const sendEmail = require('../utils/sendEmail.js');
const ApiError = require('../utils/ApiError');
const Task = require('../model/Task');
const User = require('../model/User');


nodecron.schedule('0 9 * * *', async () => {
    try {        
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
        const tasks = await Task.find({
            due_date: {
                $gte: start, $lte: end
            }
        }).populate('assigned_to', 'name email');        
        for (const task of tasks) {
            if (task.assigned_to) {
                await sendEmail('Task Due Today', `Hello ${task.assigned_to.name}, your task ${task.title} is due today`, task.assigned_to.email)
            }
        }
    } catch (err) {
        throw new ApiError(500, err);
    }
})

