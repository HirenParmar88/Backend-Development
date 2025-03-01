import { Router } from "express";
import { createProduct, getAllProduct } from "../controller/productController.js";

const productRouter=Router();

productRouter.post("/create", createProduct)
productRouter.get("/", getAllProduct)

export default productRouter