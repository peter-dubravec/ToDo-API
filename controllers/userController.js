const User = require("../models/user")
const { check } = require('express-validator');
const handleBodyErrs = require("../middleware/handleBodyErrs")
const bcrypt = require("bcryptjs")
const createJWT = require("../utils/jwtCreateToken")

const register_post = [

    // Validating incoming request body
    check("username", "Username can't be empty").trim().escape().isLength({ min: 1 }),
    check("password", "Password can't be empty").exists().isLength({ min: 1 }),
    check(
        'passwordConfirmation',
        'Password Confirmation field must have the same value as the password field',
    ).exists().custom((value, { req }) => value === req.body.password),
    handleBodyErrs,

    async (req, res) => {
        const { username, password } = req.body

        // Hash the password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create user
        try {
            const user = await User.create({ username, password: hashedPassword })
            const jwt = createJWT(user.id)
            res.status(200).json({ msg: "User Created", token: jwt, id: user.id })
            return

        } catch (err) {
            // Check if user already exists
            if (err.code = 11000) {
                res.status(400).json({ error: "Username already exists." })
                return
            }

            res.status(400).json({ error: "Error while creating user." })
            return
        }
    }
]

const login_post = [
    check("username", "Username can't be empty").trim().escape().isLength({ min: 1 }),
    check("password", "Password can't be empty").exists().isLength({ min: 1 }),
    handleBodyErrs,

    async (req, res) => {
        const { username, password } = req.body;
        // Find user in the database
        const user = await User.findOne({ username }, "password _id")

        if (user === null) {
            res.status(401).json({ error: "Username not found." })
        }

        // Compare password from request with hashed password
        const isAuth = await bcrypt.compare(password, user.password)

        if (isAuth) {
            const jwt = createJWT(user.id)
            res.status(200).json({ msg: "Logged in.", token: jwt, id: user.id })
            return
        } else {
            res.status(401).json({ error: "Login failed." })
            return
        }

    }
]


module.exports = { register_post, login_post }