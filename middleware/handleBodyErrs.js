const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsMsgs = errors.array().map(val => val.msg)
        // Return array of errors
        return res.status(400).json({ error: errorsMsgs })
    } else {
        next()
    }
}