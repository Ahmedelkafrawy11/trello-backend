import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['toDo', 'doing', 'done']

    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    deadline: {
        type: Date,
        required: true
    },
    attachment: {
        type: String,

    }
})

export const taskModel = mongoose.model('task', taskSchema)