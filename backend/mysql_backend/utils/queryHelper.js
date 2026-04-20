const db = require('../config/db');
const ApiError = require('./ApiError');
const executeQuery = async (query, params = []) => {
    try {
        const [result] = await db.query(query, params);
        return result;
    } catch (error) {
        throw ApiError(404, error.message);
    }
}
module.exports=executeQuery;