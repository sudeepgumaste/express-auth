import { Router } from "express";
import { authRouter } from "../resources/auth/auth.router";
import {postsRouter} from "../resources/posts/posts.router";

export const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/posts", postsRouter);