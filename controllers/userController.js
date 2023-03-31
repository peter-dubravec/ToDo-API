const User = require("../models/user")
const { check } = require('express-validator');


const register_post = [
    check("username", "Username can't be empty").trim().escape().isLength({ min: 1 }),
    check("password", "Password can't be empty").exists().isLength({ min: 1 }),
    check(
        'passwordConfirmation',
        'passwordConfirmation field must have the same value as the password field',
    ).exists().custom((value, { req }) => value === req.body.password),

    (req, res) => {
        console.log(req.body)
    }
]







module.exports = { register_post }