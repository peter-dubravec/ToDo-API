const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const taskController = require("../controllers/taskController")

const isAuth = require("../middleware/isAuth")

module.exports = (passport) => {

    /**
     * @swagger
     *  /api/register:
     *      post:
     *          summary: Register new user
     *          parameters:
     *              - in: body
     *                name: UserData
     *                description: Data about user
     *                schema:
     *                  type: object
     *                  required: 
     *                      - username
     *                      - password
     *                      - passwordConfirmation
     *                  properties:
     *                      username:
     *                          type: string
     *                      password:
     *                          type: string
     *                      passwordConfirmation:
     *                          type: string
     * 
     *          responses:
     *              200:
     *                  description: New user created, token sent
     *              400:
     *                  description: Error object with message or array of messages
     *          
     */
    router.post("/register", userController.register_post)

    /**
     * @swagger
     *  /api/login:
     *      post:
     *          summary: Login user
     *          parameters:
     *              - in: body
     *                name: UserData
     *                description: Data about user
     *                schema:
     *                  type: object
     *                  required: 
     *                      - username
     *                      - password
     *                  properties:
     *                      username:
     *                          type: string
     *                      password:
     *                          type: string
     * 
     *          responses:
     *              200:
     *                  description: New user created, token sent
     *              400:
     *                  description: Error object with message or array of messages
     *          
     */
    router.post("/login", userController.login_post)

    /**
    * @swagger
    * /api/projects:
    *      get:
    *          summary: Get all projects and tasks
    *          responses:
    *              200:
    *                  description: Array of all project and respective tasks
    *                  content:
    *                       application/json:
    *                           schema: 
    *                               type: array
    *                                 
    *                                        
    *              400: 
    *                  description: Couldn't load projects
    */
    router.get("/projects", projectController.projects_get)

    // Authentification required for these routes

    /**
    * @swagger
    *  /api/create-project:
    *      post:
    *          security: 
    *              - Bearer: []
    *          summary: Register new user
    *          parameters:
    *              - in: body
    *                name: UserData
    *                description: Data about user
    *                schema:
    *                  type: object
    *                  required: 
    *                      - title
    *                  properties:
    *                      title:
    *                          type: string
    * 
    *          responses:
    *              200:
    *                  description: New user project, object with details about project sent
    *              400:
    *                  description: Error object with message or array of messages
    *              401: 
    *                  description: Unauthorized.
    */
    router.post("/create-project", isAuth(passport), projectController.createProject_post)

    /**
     * @swagger
     *  /api/addTask/{projectId}:
     *      post:
     *          security: 
     *              - BearerAuth: []
     *          summary: Add task to project
     *          parameters:
     *              - in: path
     *                name: projectId
     *                description: ID of project
     *                schema:
     *                  type: string
     *              - in: body
     *                description: Data about task
     *                schema: 
     *                  type: object
     *                  required: 
     *                      - title
     *                      - text
     *                      - flag
     *                  properties:
     *                      title:    
     *                          type: string
     *                      text:
     *                          type: string
     *                      flag:
     *                          type: string
     *                  
     *          responses:
     *              200: 
     *                  description: Task added to project, updated project sent back
     *              400:
     *                  description: Error object with message or array of messages
     *              401: 
     *                  description: Unauthorized                      
     * 
     */
    router.post("/addTask/:projectId", isAuth(passport), taskController.addTask_post)

    /**
     * @swagger
     *  /api/share/{projectId}:
     *      post:
     *          summary: Share project with users
     *          security: 
     *              - BearerAuth: []
     *          parameters:
     *              - in: path
     *                name: projectId
     *                description: ID of project
     *                schema:
     *                  type: string
     *              - in: body
     *                description: ID of user to add
     *                schema: 
     *                  type: object
     *                  required:
     *                      - userId
     *                  properties:
     *                      userId:   
     *                          type: string
     *                      
     *                  
     *          responses:
     *              200: 
     *                  description: Project shared, success message sent
     *              400:
     *                  description: Error object with message or array of messages
     *              401: 
     *                  description: Unauthorized                      
     * 
     */
    router.post("/share/:projectId", isAuth(passport), projectController.shareTask_post)

    /**
    * @swagger
    *  /api/change-flag/{projectId}/task/{taskId}:
    *      post:
    *          summary: Change flag on task
    *          security: 
    *              - BearerAuth: []
    *          parameters:
    *              - in: path
    *                name: projectId
    *                description: ID of project
    *                schema: 
    *                  type: string
    *              - in: path
    *                name: taskId
    *                description: ID of task
    *                schema:
    *                  type: string
    *              - in: body
    *                description: Flag status
    *                schema:
    *                   type: object
    *                   required:
    *                       - flag
    *                   properties:
    *                       flag:
    *                           type: string
    *                        
    *          responses:
    *              200: 
    *                  description: Flag changed, success message sent
    *              400:
    *                  description: Error object with message or array of messages
    *              401: 
    *                  description: Unauthorized                      
    * 
    */
    router.post("/change-flag/:projectId/task/:taskId", isAuth(passport), taskController.changeFlag_post)

    return router
}