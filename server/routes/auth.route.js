import express from 'express';
import { checkAuth, login, logout, register } from '../controller/auth.controller.js';

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/check-auth").get(checkAuth);

export default router;