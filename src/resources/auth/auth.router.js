import { Router } from "express";
import { register, login, logout, refresh } from "./auth.controller";
import { verifyToken } from "./auth.middleware";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", verifyToken, logout );
authRouter.post("/refresh", refresh );
