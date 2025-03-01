import { Router } from "express";
import { createUser, getAllUser } from "../controller/userController.js";

const userRouter=Router();

userRouter.post('/create', createUser)
userRouter.get('/', getAllUser)
// userRouter.put('/updateUser', )
// userRouter.delete('/deleteUser', )

export default userRouter