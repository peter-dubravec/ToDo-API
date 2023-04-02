const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title: { type: String, unique: true, required: true, index: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema)