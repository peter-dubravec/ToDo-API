const Project = require("../models/project")
const { check } = require('express-validator');
const handleBodyErrs = require("../middleware/handleBodyErrs");
const isParticipant = require("../middleware/isParticipant");

const createProject_post = [
    check("title", "Invalid title").trim().escape().isLength({ min: 1 }),
    handleBodyErrs,
    async (req, res) => {
        const { title } = req.body
        try {
            const project = await (await Project.create({ title, participants: [req.user.id] })).populate("participants", "username")
            return res.status(200).json(project)

        } catch (err) {
            // Check for duplicate error
            if (err.code === 11000) {
                res.status(400).json({ error: "This project already exists." })
                return
            }

            res.status(400).json({ error: "There was an error while creating project." })
        }
    }
]

const projects_get = async (req, res) => {
    try {
        const projects = await Project.find({}).populate("participants", "username").populate({ path: "tasks", populate: { path: "createdBy", select: "username" } })

        res.status(200).json(projects)
    } catch (err) {
        res.status(400).json({ error: "Couldn't load the projects." })
    }
}


const shareProject_post = [
    check('userId', 'Invalid User ID').isMongoId(),
    handleBodyErrs,
    isParticipant,
    async (req, res) => {
        // Id of project
        let { projectId } = req.params
        // Id of user
        const { userId } = req.body
        
        try {
            const project = await Project.findByIdAndUpdate(projectId, { $addToSet: { participants: userId } })

            if (project === null) {
                res.status(400).json({ error: "Project not found." })
            }

            res.status(200).json({ msg: "User Added!" })
        } catch (err) {
            res.status(400).json({ error: "Can't share the project." })
        }

    }
]

module.exports = { createProject_post, projects_get, shareProject_post }