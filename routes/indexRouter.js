const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

module.exports = (passport) => {

    router.post("/register", userController.register_post)

    return router
}