import { Router } from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../controller/userController.js";
import { adminAccess, verifyToken } from "../middleware/authMiddleware.js";

const userRouter=Router();

userRouter.post('/create',verifyToken, adminAccess, createUser)
userRouter.get('/', verifyToken, getAllUser)
userRouter.put('/:id', verifyToken, updateUser)
userRouter.delete('/:id', verifyToken, deleteUser)

export default userRouter