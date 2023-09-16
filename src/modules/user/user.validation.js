import Joi from "joi"



export const signUpSchema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,15}$/).required(),
    age: Joi.number().min(14).max(70).required(),
    gender:Joi.string().pattern(/^(male|female)$/).required(),
    phone:Joi.string().pattern(/^(010|011|012|015)\d{8}$/).required()
})
export const signInSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required()

})
export const updateUserSchema = Joi.object({
    userName: Joi.string().min(2).max(30),
    age: Joi.number().min(14).max(70),
    gender:Joi.string().pattern(/^(male|female)$/),
    phone:Joi.string().pattern(/^(010|011|012|015)\d{8}$/)
})

export const addPhotoSchema = Joi.object({
    profile:Joi.string().required()
})
export const addArrayOfCoverSchema = Joi.object({
    cover:Joi.string().required()
})














