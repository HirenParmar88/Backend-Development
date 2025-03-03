import { Router } from "express";
import { addAccessories, deleteAccessories, getAllAccessories, updateAccessories } from "../controller/accessoriesController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const accessoriesRouter=Router();

accessoriesRouter.post("/create", verifyToken, addAccessories)
accessoriesRouter.get("/", verifyToken, getAllAccessories)
accessoriesRouter.delete("/:id", verifyToken, deleteAccessories)
accessoriesRouter.put("/:id", verifyToken, updateAccessories)

export default accessoriesRouter