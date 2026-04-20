const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    description:{
        type:String,
        default:null
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
        ref:'User'
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    delete_status:{
        type:Number,
        default:0
    }
},{timestamps:false})
module.exports=mongoose.model('Project',projectSchema);