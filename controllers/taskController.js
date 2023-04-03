const Task = require("../models/task")
const Project = require("../models/project")
const { check } = require('express-validator');
const handleBodyErrs = require("../middleware/handleBodyErrs")
const isParticipant = require("../middleware/isParticipant")


const addTask_post = [
    check("title", "Invalid title").trim().escape().isLength({ min: 1 }),
    check("text").trim().escape().isLength({ min: 1 }),
    check("flag", "Invalid flag.").isIn(["active", "finished", "cancelled"]),
    handleBodyErrs,
    isParticipant,
    async (req, res) => {
        console.log("here")
        const { projectId } = req.params
        const { title, text, flag } = req.body
        try {
            const task = await Task.create({ title, text, flag, createdBy: req.user.id })
            const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { tasks: task.id } })

            res.status(200).json(task)

        } catch (err) {
            console.log(err)

            if (err.code === 11000) {
                res.status(400).json({ error: "This task already exists." })
                return
            }
            res.status(400).json({ error: "Invalid query parameters" })
        }

    }
]

const changeFlag_post = [
    check("flag", "Invalid flag").isIn(["active", "finished", "cancelled"]),
    handleBodyErrs,
    isParticipant,
    async (req, res) => {
        const { taskId } = req.params
        const { flag } = req.body

        try {
            const task = await Task.findByIdAndUpdate(taskId, { flag }, { new: true })
            res.status(200).json(task)
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: "There was an error while attempting to change the flag" })
        }

    }
]



module.exports = { addTask_post, changeFlag_post }