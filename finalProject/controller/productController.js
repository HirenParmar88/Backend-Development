import prisma from "../db/db.config.js";

//POST
const createProduct=async(req,res)=>{
    try {
        console.log("Add product Api call..");
        const {product_name, price, description}=req.body;
        console.log("req.body",req.body);
        
        // const priceInt = parseFloat(price);
        // console.log(priceInt);
        
        const createProductData = await prisma.product.create({
            data:{
                product_name:product_name,
                price:price,
                description:description,
            },
            // select:{
            //     product_name:true,
            //     price:true,
            //     description:true,
            // }
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
        //const createProductData = await prisma.product.findMany()
        const createProductData = await prisma.$queryRaw`select * from product where id=2`; //prisma query raw
        console.log("createProductData data :",createProductData);
        return res.status(200).json({message:"Get All products's Successfully", data:createProductData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error to add product"})
    }
}

export {createProduct, getAllProduct};