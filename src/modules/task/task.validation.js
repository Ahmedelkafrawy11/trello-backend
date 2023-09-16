
export const addTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().max(250).required(),
    status: Joi.string().pattern(/^(todo|doing|done)$/).required(),
    deadline: Joi.date().format('YYYY-MM-DD').utc().required()
})

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().max(250),
    status: Joi.string().pattern(/^(todo|doing|done)$/),
    deadline: Joi.date().format('YYYY-MM-DD').utc()
})



















