import {Router} from 'express';
import {getPosts} from './posts.controller'

import {verifyToken} from '../auth/auth.middleware';

export const postsRouter = Router();

postsRouter.get('/', verifyToken, getPosts);