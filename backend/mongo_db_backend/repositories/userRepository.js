const User = require('../model/User.js');
const RefreshToken = require('../model/RefreshToken.js');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const createUserDB = async (name, email, password, role) => {
    return await User.create({ name, email, password, role });
}

const getUserDataDB = async (id) => {
    return await User.findById(id).select('_id role name email');
}

const logoutDB = async (id) => {
    return await RefreshToken.deleteMany({ user_id: id });
}

const editUserDB = async (userData, userId) => {
    let updateFields = {};
    const { email, name, password, role } = userData;
    if (email) updateFields.email = email;
    if (name) updateFields.name = name;
    if (role) updateFields.role = role;
    if (password) updateFields.password = password;
    return await User.findByIdAndUpdate(userId, { $set: updateFields }, { returnDocument: 'after' });
}
const deletUserDB = async (userId) => {
    return await User.findByIdAndUpdate(userId, {
        delete_status: true
    },{new:true})
}

const getAllUserDB = async (page, limit, offset, search) => {
    const query = {
        delete_status: false
    }
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    const data = await User.find(query).limit(limit).skip(offset);
    const countResult = await User.countDocuments(query);
    const totalPages = Math.ceil(countResult / limit);
    const result = { data, countResult, page, limit, totalPages };
    return result;
}
const getUserListDB = async()=>{
    const result = await User.find().select('_id name');
    return result;
}
module.exports = {
    findUserByEmail, createUserDB, getUserDataDB, logoutDB, editUserDB, deletUserDB, getAllUserDB,getUserListDB
}