import prisma from "../db/db.config.js";
import CryptoJS from "crypto-js"
import {secretKey} from "../utils/constant.js"
import userSchemaValidate from "../validations/userValidation.js";

//POST
const createUser=async(req,res)=>{
    try {
        console.log("create user call..");
        const {name, password, email}=req.body;
        const result = await userSchemaValidate.validateAsync(req.body)
        console.log(result);
        
        const ciphertext =await CryptoJS.AES.encrypt(result.password,secretKey).toString()
        console.log("Cipher Text :", ciphertext);
        const findExistingUser=await prisma.user.findUnique({
            where:{
                email:result.email
            }
        })
        if(findExistingUser){
            return res.status(409).json({message:"User Already exist", code:409, success:false})
        }
        const createUserData = await prisma.user.create({
            data:{
                name:result.name,
                password:ciphertext,
                email:result.email
            },
            select:{
                name:true,
                password:false,
                email:true,
            }
        })
        console.log("createUserData data :",createUserData);
        return res.status(200).json({code: 200, success:true, message:"New User Created Successfully", data:createUserData})
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422})
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//GET 
const getAllUser=async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const rawsPerPage = parseInt(req.query.rawsPerPage) || 10;
    const offset = (page - 1) * rawsPerPage;
    console.log("offset:",offset);
    
    try {
        console.log("get user API call..");
        const createUserData = await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true,
                updatedAt:true
            },
            orderBy:{
                id:"asc",
            },
            skip: offset,
            take:rawsPerPage,
        })
        console.log("createUserData data :",createUserData);

        const userCount = await prisma.user.count()
        console.log("Get userCount :", userCount);
        
        return res.status(200).json({code:200, success:true, page:page, rawsPerPage:rawsPerPage, count: userCount, message:"Get All User's Successfully", data:createUserData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//Delete
const deleteUser=async(req,res)=>{
    try {
        console.log("delete user API call..");

        //First, delete userId related all the products
        const userRelatedProduct = await prisma.product.deleteMany({
            where:{
                userId:parseInt(req.params.id)
            }
        })
        console.log(userRelatedProduct);
        
        //Now, user delete
        const userdata=await prisma.user.delete({
            where:{
                id:parseInt(req.params.id)
            }
        })
        console.log("deleted userdata",userdata);

        const countDeletedUser = await prisma.user.count()
        console.log(countDeletedUser);
        
        return res.status(200).json({ code:200, count:countDeletedUser, success:true, message:"users deleted successfully", data:userdata})
    } catch (error) {
        console.log(error)
        if(error.code === "P2025"){
            return res.status(404).json({message:"user does not exist", code:404, success:false})
        }
        if(error.code === 'P2003'){
            return res.status(400).json({message:"productId foreign key constraint violation", code:400})
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//PUTs
const updateUser=async(req,res)=>{
    try {
        console.log("user update API call..");
        const {name, email, password}=req.body;
        //const result= userSchemaValidate.validateAsync(req.body)
        //console.log("validate result", result);
        
        console.log("req.body to update :",req.body);
        const ciphertext = await CryptoJS.AES.encrypt(password,secretKey).toString()
        console.log("Cipher Text Update pass:", ciphertext);
        
        const findUser = await prisma.user.findFirst({
            where:{
                id:parseInt(req.params.id)
            }
        })
        if(!findUser){
            console.log("userId does not exist");
            return res.status(404).json({message:"User Not Found", code:404, success:false})
        }
        const updatedUser=await prisma.user.update({
            data:{
                name:name,
                email:email,
                password:ciphertext
            },
            where:{
                id:parseInt(req.params.id)
            }
        })
        console.log("updated user data",updatedUser);
        const updateCount = await prisma.user.count()
        console.log(updateCount);
        
        return res.status(200).json({message:"user updated successfully", data:updatedUser, code:200, total:updateCount, success:true})
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422})
        }
        console.log(error);
        return res.status(500).json({message:"Internal Server Error", code:500})
    }
}

export {createUser, getAllUser, deleteUser, updateUser};