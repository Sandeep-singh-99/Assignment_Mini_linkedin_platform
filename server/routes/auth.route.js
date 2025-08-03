import express from 'express';
import { checkAuth, login, logout, register } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(authMiddleware, logout);

router.route("/check-auth").get(authMiddleware, checkAuth);

export default router;