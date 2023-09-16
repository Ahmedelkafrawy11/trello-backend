import express from 'express';

import { addAttachmentOfTask, addTask, allTasksWithUsers, deleteTask, notDoneTasks, oneOnlineTasks, oneUserTasks, updateTask } from './task.controller.js';
import { auth } from '../../middlewares/auth.js';
import { uploadAttach } from '../../multer/uploadTaskAttach.js';
const taskRouter = express.Router()


taskRouter.post('/tasks', auth, addTask)
taskRouter.put('/tasks', auth, updateTask)
taskRouter.delete('/tasks', auth, deleteTask)
taskRouter.get('/tasksWithUsers', allTasksWithUsers)
taskRouter.get('/oneUserTasks', auth, oneUserTasks)
taskRouter.get('/oneOnlineTasks', auth, oneOnlineTasks)
taskRouter.get('/notDoneTasks', notDoneTasks)
taskRouter.post('/uploadAttach',uploadAttach('attach'),addAttachmentOfTask)









export default taskRouter