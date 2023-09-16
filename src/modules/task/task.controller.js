import jwt from 'jsonwebtoken'
import { taskModel } from '../../../models/task.model.js'
import { userModel } from '../../../models/user.model.js';
import { userSchema } from '../../../models/user.model.js';


export const addTask = async (req, res) => {
    const { title, description, status, assignedTo, deadline } = req.body;
    let task = await taskModel.findOne({ title })
    if (!task) {

        let userId = req.decoded.id;
        let user = await userModel.findById(userId)
        if (user) {
            if (user.isOnline == false) {
                res.json({ message: "user is offline please sign in to add task " })
            } else if (user.isDeleted == true) {
                res.json({ message: "user doesn't exist cause it deleted before" })
                // } else if (userId != user._id || assignedTo != user._id) {
                //     res.json({ message: "user doesn't match please check " })
            } else if (deadline < Date.now()) {
                res.json({ message: "invalid date please enter date after now" })
            } else {
                const parsedDeadline = new Date(deadline);
                await taskModel.insertMany({ title, description, status, userId, assignedTo, deadline: parsedDeadline })
                res.json({ message: "task added successfully" })
            }

        } else {
            res.json({ message: "user not found" })
        }

    } else {
        res.json({ message: "task already exists" })
    }
}

export const updateTask = async (req, res) => {
    const { title, description, status, taskId, assignedTo } = req.body


    // const task = await taskModel.findById(taskId)

    // if (task) {

    //     if (task.userId.toString() !== userId) {
    //         res.json({ message: 'user not Only the creator can update this post' })

    //     } else if (task.userId.isOnline == false) {
    //         res.json({ message: "user is offline please sign in to add task " })


    //     } else if (task.userId.isDeleted == true) {
    //         res.json({ message: "user doesn't exist cause it deleted before" })
    //     } else {
    //         let data = await taskModel.findByIdAndUpdate({ _id: taskId }, { title, description, status, assignedTo }, { new: true })
    //         res.json({ message: 'task updated successfully', data })
    //     }

    // } else {
    //     res.json({ message: 'task does not exist' })
    // }
    let userId = req.decoded.id;
    const user = await userModel.findById(userId);


    const task = await taskModel.findById(taskId);

    if (!task) {
        res.json({ message: "Task not found" });
    }

    if (task.userId.toString() !== decoded.id) {
        res.json({ message: "Unauthorized" });
    }
    if (task.assignedTo.isOnline == false) {
        res.json({ message: "user is offline please sign in to add task " })
    }

    let data = await taskModel.findByIdAndUpdate({ _id: taskId }, { title, description, status, assignedTo }, { new: true })
    res.json({ message: 'task updated successfully', data })




}
export const deleteTask = async (req, res) => {
    const { taskId } = req.body

    // const task = await taskModel.findById(taskId)

    // if (task) {

    //     if (task.userId.toString() !== userId) {
    //         res.json({ message: 'user not Only the creator can delete this post' })

    //     } else if (task.userId.isOnline == false) {
    //         res.json({ message: "user is offline please sign in to add task " })


    //     } else if (task.userId.isDeleted == true) {
    //         res.json({ message: "user doesn't exist cause it deleted before" })
    //     } else {
    //         await taskModel.findByIdAndDelete({ _id: taskId })
    //         res.json({ message: 'task deleted successfully' })
    //     }

    // } else {
    //     res.json({ message: 'task does not exist' })
    // }
    let userId = req.decoded.id;
    const user = await userModel.findById(userId);


    const task = await taskModel.findById(taskId);

    if (!task) {
        res.json({ message: "Task not found" });
    }

    if (task.userId.toString() !== userId) {
        res.json({ message: "Unauthorized" });
    }
    if (task.assignedTo.isOnline == false) {
        res.json({ message: "user is offline please sign in to delete task " })
    }

    await taskModel.findByIdAndDelete({ _id: taskId })
    res.json({ message: 'task delete successfully' })



}
export const allTasksWithUsers = async (req, res) => {


    const task = await taskModel.find({}).populate('assignedTo', '-_id -password -confirmPassword')

    if (task.length) {
        res.json({ message: 'success', task })

    } else {
        res.json({ message: 'posts not found' })
    }

}


export const oneUserTasks = async (req, res) => {
    let userId = req.decoded.id;

    const task = await taskModel.find({ assignedTo: userId }).populate('assignedTo', '-_id -password -confirmPassword')

    if (task.length) {
        res.json({ message: 'success', task })

    } else {
        res.json({ message: 'tasks not found' })
    }

}
export const oneOnlineTasks = async (req, res) => {
    let userId = req.decoded.id;

    const task = await taskModel.find({ assignedTo: userId, isOnline: true }).populate('assignedTo', '-_id -password -confirmPassword')

    if (task.length) {
        res.json({ message: 'success', task })

    } else {
        res.json({ message: 'tasks not found' })
    }

}
export const notDoneTasks = async (req, res) => {


    const task = await taskModel.find({ status: 'toDo' }).populate('assignedTo', '-_id -password -confirmPassword')

    if (task.length) {
        res.json({ message: 'success', task })

    } else {
        res.json({ message: 'tasks not found' })
    }

}
export const addAttachmentOfTask = async (req, res, next) => {
    const id = req.params.id
    // req.body.profile = req.file.filename

    const fileName = req.file.filename
    // let user = await userModel.findById(id)
    let task = await taskModel.findByIdAndUpdate(id, { attach: fileName }, { new: true })
    if (task) {
        res.json({ message: 'added task attachment  successfully' })
    } else {
        res.json({ message: "task not found" })
    }

}















