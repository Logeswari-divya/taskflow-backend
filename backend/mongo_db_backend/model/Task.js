const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim:true
    },
    description: {
        type: String,
        default: null
    },
    status: {
        required: true,
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default:'pending',
        index:true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        defalut: Date.now()
    },
    due_date:{
        type:Date,
        default:Date.now()
    }
}, { timestamps: false });
module.exports = mongoose.model('Task',taskSchema);