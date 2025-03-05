import prisma from "../db/db.config.js";
import { productSchema, productUpdateSchema } from "../validations/productValidation.js";

//POST
const createProduct=async(req,res)=>{
    try {
        console.log("Add product Api call..");
        const {product_name, price, description, userId}=req.body;
        console.log("req.body",req.body);
        const result = await productSchema.validateAsync(req.body)
        console.log(result);
        
        const createProductData = await prisma.product.create({
            data:{
                product_name:result.product_name,
                price:result.price,
                description:result.description,
                userId:result.userId
            }
        })
        console.log("createProductData data :",createProductData);
        return res.status(200).json({message:"New Product Added Successfully", data:createProductData})
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422})
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//GET 
const getAllProduct=async(req,res)=>{
    try {
        console.log("get product api call..");
        const createProductData = await prisma.product.findMany()
        //const createProductData = await prisma.$queryRaw`select * from product where id=2`; //prisma query raw
        console.log("createProductData data :",createProductData);
        const productCount = await prisma.product.count()
        console.log("Get productCount :", productCount);
        
        return res.status(200).json({code:200, count:productCount, message:"Get All products's Successfully", data:createProductData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error to add product"})
    }
}

//delete
const deleteProduct = async(req,res)=>{
    try {
        console.log("delete product API call..");
        //First, delete accessories related product
        await prisma.accessories.deleteMany({
            where:{

                productId:parseInt(req.params.id)
            }
        })
        //Now, delete product itself
        const deletedProductData = await prisma.product.delete({
            where:{
                id:parseInt(req.params.id)
            }
        })
        console.log("deletedProductData :", deletedProductData);
        return res.status(200).json({message:"product data deleted successfully", data:deletedProductData, code:200})
    } catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            console.log("Record Not Found");
            return res.status(404).json({message:"Product Record Not Found", code:404})
        }
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//update 
const updateProduct = async(req,res)=>{
    try {
        console.log("update product API call..");
        const findProduct = await prisma.product.findFirst({
            where:{
                id:parseInt(req.params.id)
            }
        })
        if(!findProduct){
            return res.status(404).json({message:"Product Record Not Found", code:404})
        }

        const {product_name, price, description, userId}=req.body;
        //console.log("req.body update product:",req.body);

        const result = await productUpdateSchema.validateAsync(req.body)
        console.log(result);
        const updatedProductData = await prisma.product.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                product_name:result.product_name,
                price:result.price,
                description:result.description,
                userId:result.userId
            }
        })
        console.log("updatedProductData :", updatedProductData);
        return res.status(200).json({message:"product data updated successfully", data:updatedProductData, code:200})
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422})
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}
export {createProduct, getAllProduct, deleteProduct, updateProduct};