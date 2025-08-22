import express from 'express';
import { getProfile, getUsers, LoginUser, RegisterUser, updatePassword, updateProfileUser, uploadImageAvatar, } from '../controllers/auth.controller.js';
import { isAuth, localUser } from '../middlewares/AuthMiddleware.js';
import upload from '../middlewares/UploadMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', RegisterUser)
authRouter.post('/login', LoginUser)
authRouter.post('/logout', isAuth, localUser)
authRouter.get('/profile', isAuth, getProfile)
authRouter.get('/users', isAuth, getUsers)
authRouter.post('/upload', isAuth, upload.single('avatar'), uploadImageAvatar)
authRouter.put('/update', isAuth, updateProfileUser)
authRouter.put("/update-pw", isAuth, updatePassword)

export default authRouter

    