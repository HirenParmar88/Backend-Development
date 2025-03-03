import prisma from "../db/db.config.js";

//POST
const createProduct=async(req,res)=>{
    try {
        console.log("Add product Api call..");
        const {product_name, price, description, userId}=req.body;
        console.log("req.body",req.body);
        const createProductData = await prisma.product.create({
            data:{
                product_name:product_name,
                price:price,
                description:description,
                userId:userId
            }
        })
        console.log("createProductData data :",createProductData);
        return res.status(200).json({message:"New Product Added Successfully", data:createProductData})
    } catch (error) {
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
        return res.status(200).json({message:"Get All products's Successfully", data:createProductData, code:200})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error to add product"})
    }
}

//delete
const deleteProduct = async(req,res)=>{
    try {
        console.log("delete product API call..");
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
            return res.status(404).json({message:"Record Not Found", code:404})
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
            return res.status(404).json({message:"Product Not Found", code:404})
        }
        const updatedProductData = await prisma.product.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                product_name:req.body.product_name,
                price:req.body.price,
                description:req.body.description,
                userId:req.body.userId
            }
        })
        console.log("updatedProductData :", updatedProductData);
        return res.status(200).json({message:"product data updated successfully", data:updatedProductData, code:200})
    } catch (error) {
        // if (error.code === 'P2025') {
        //    console.log("Record Not Found");
        //    return res.status(404).json({message:"Record Not Found", code:404})
        // }
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}
export {createProduct, getAllProduct, deleteProduct, updateProduct};