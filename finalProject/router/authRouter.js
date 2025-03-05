import { Router } from "express";
import login from "../controller/loginController.js";
import logout from "../controller/logoutController.js";
import { loginRateLimiter, verifyToken } from "../middleware/authMiddleware.js";

const authRouter=Router();

authRouter.post('/login', loginRateLimiter, login)
authRouter.post('/logout', verifyToken, logout)

export default authRouter