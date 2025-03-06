import { Router } from "express";
import { createProduct, deleteProduct, filterProduct, getAllProduct, updateProduct } from "../controller/productController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const productRouter=Router();

productRouter.post("/create", verifyToken, createProduct)
productRouter.get("/", verifyToken, getAllProduct)
productRouter.delete("/:id", verifyToken, deleteProduct)
productRouter.put("/:id", verifyToken, updateProduct)
//Applaying Filtering
productRouter.get("/findbyName", verifyToken, filterProduct)

export default productRouter