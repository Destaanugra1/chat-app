import express from 'express';
import { LoginUser, RegisterUser } from '../controllers/auth.controller.js';
import { isAuth, localUser } from '../middlewares/AuthMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', RegisterUser)
authRouter.post('/login', LoginUser)
authRouter.post('/logout', isAuth, localUser)

export default authRouter

