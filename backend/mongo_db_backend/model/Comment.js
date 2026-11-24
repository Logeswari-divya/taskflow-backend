const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        index: true,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        trim: true
    },
    created_at: {
        type: Date,
        defaulf: Date.now()
    }
}, { timestamps: true });
module.exports = mongoose.model('Comment',commentSchema);
