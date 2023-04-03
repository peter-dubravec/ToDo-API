const Project = require("../models/project")

// Check if is participant in the project
module.exports = async (req, res, next) => {
    let { projectId } = req.params

    const project = await Project.findById(projectId).where("participants").equals(req.user.id)

    // Id not found in list of projects participants, else move to next middleware
    if (project === null) {
        res.status(403).json({ msg: "You are not participant in this project" })
        return
    } else {
        return next()
    }
}