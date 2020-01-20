import {Router} from 'express';
import {register, login} from './auth.controller';

export const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)