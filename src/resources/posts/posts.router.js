import {Router} from 'express';
import {getPosts} from './posts.controller'

export const postsRouter = Router();

postsRouter.get('/', getPosts);