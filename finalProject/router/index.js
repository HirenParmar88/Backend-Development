import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import accessoriesRouter from "./accessoriesRouter.js";

const router=Router();

router.use("/auth", authRouter)
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/accessories", accessoriesRouter);

export default router;