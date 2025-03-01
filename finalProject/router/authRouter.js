import { Router } from "express";
import login from "../controller/loginController.js";
import logout from "../controller/logoutController.js";

const authRouter=Router();

authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter