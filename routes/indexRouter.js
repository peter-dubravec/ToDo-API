const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const taskController = require("../controllers/taskController")

const isAuth = require("../middleware/isAuth")

module.exports = (passport) => {

  
    router.post("/register", userController.register_post)

  
    router.post("/login", userController.login_post)

   
    router.get("/projects", projectController.projects_get)

    // Authentification required for these routes

   
    router.post("/create-project", isAuth(passport), projectController.createProject_post)

   
    router.post("/add-task/:projectId", isAuth(passport), taskController.addTask_post)

   
    router.post("/share/:projectId", isAuth(passport), projectController.shareProject_post)

   
    router.post("/change-flag/:projectId/task/:taskId", isAuth(passport), taskController.changeFlag_post)

    return router
}