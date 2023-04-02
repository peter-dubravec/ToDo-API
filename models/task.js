const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title: { type: String, required: true, unique: true },
    text: { type: String },
    flag: { type: String, required: true, enum: ["active", "finished", "cancelled"] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

module.exports = mongoose.model("Task", TaskSchema)