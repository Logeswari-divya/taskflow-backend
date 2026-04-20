const mongoose =require('mongoose');
const refreshTokenSchema = new mongoose.Schema({
    token:String,
    user_id:mongoose.Schema.Types.ObjectId,
    expiresAt:Date
})
module.exports = mongoose.model('RefreshToken',refreshTokenSchema)