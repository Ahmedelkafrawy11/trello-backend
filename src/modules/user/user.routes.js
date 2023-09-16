import express from 'express';
import { addArrOfCover, addPhoto, changePassword, deleteUser, existEmail, forgetPassword, logOut, signIn, signUp, softDelete, updateUser, verifyEmail } from './user.controller.js';
import { auth } from '../../middlewares/auth.js';
import { uploadFile } from '../../multer/fileUpload.js';
import { uploadCover } from '../../multer/uploadArrayOfPhotos.js';
import { signInSchema, signUpSchema, updateUserSchema } from './user.validation.js';
import { validation } from '../../middlewares/validation.js';

const userRouter = express.Router()





userRouter.post('/signUp',validation(signUpSchema), signUp)
userRouter.post('/signIn',validation(signInSchema) ,signIn)
userRouter.put('/users', auth, validation(updateUserSchema),updateUser)
userRouter.delete('/users', auth, deleteUser)
userRouter.put('/change', auth, changePassword)
userRouter.put('/soft', auth, softDelete)
userRouter.put('/logOut', auth, logOut)
userRouter.get('/verify/:token', verifyEmail)
userRouter.post('/forgetPassword', existEmail)
userRouter.post('/forgetPassword/:token', forgetPassword)
userRouter.post('/users/:id/cover', uploadCover('cover'), addArrOfCover)
userRouter.post('/users/:id/profile', uploadFile('profile'), addPhoto)


export default userRouter