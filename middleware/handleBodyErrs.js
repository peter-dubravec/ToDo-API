const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    const errorsMsgs = errors.array().map(val => val.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errorsMsgs })
    } else {
        next()
    }
}