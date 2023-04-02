const jwt = require('jsonwebtoken');

/**
 * 
 * @param {string} _id Id to be signed
 * @returns {string} JWT 
 */

module.exports = (_id) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3000m' })
    return token;
};