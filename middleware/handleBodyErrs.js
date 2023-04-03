const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsMsgs = errors.array().map(val => val.msg).join(";")
        // Return errors
        return res.status(400).json({ error: errorsMsgs })
    } else {
        next()
    }
}