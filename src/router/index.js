import { Router } from "express";
import { authRouter } from "../resources/auth/auth.router";

export const router = Router();

router.use("/api/auth", authRouter);
