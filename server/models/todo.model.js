const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name is required"],
        minLength: [3, "Task name must be 3 characters or longer"]
    }, dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }, status: {
        type: String,
        default: "Todo"
    }

}, {timestamps: true})

module.exports = mongoose.model("Todo", TodoSchema)