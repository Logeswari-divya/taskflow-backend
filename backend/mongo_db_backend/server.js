const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
require('./jobs/dueDateRemainder');
app.use(cors());
app.use('/api/auth',authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/tasks',taskRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`SERVER LISTENING TO THE PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer();


