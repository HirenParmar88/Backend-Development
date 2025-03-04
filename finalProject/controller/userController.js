import prisma from "../db/db.config.js";
import CryptoJS from "crypto-js"
import {secretKey} from "../utils/constant.js"

//POST
const createUser=async(req,res)=>{
    try {
        console.log("create user call..");
        const {name, password, email}=req.body;
        const ciphertext =await CryptoJS.AES.encrypt(password,secretKey).toString()
        console.log("Cipher Text :", ciphertext);
        const createUserData = await prisma.user.create({
            data:{
                name:name,
                password:ciphertext,
                email:email
            },
            select:{
                name:true,
                password:false,
                email:true,
            }
        })
        console.log("createUserData data :",createUserData);
        return res.status(200).json({message:"New User Created Successfully", data:createUserData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//GET 
const getAllUser=async(req,res)=>{
    try {
        console.log("get user call..");
        const createUserData = await prisma.user.findMany()
        console.log("createUserData data :",createUserData);
        return res.status(200).json({message:"Get All User's Successfully", data:createUserData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//Delete
const deleteUser=async(req,res)=>{
    try {
        console.log("delete user API call..");
        const userdata=await prisma.user.delete({
            where:{
                id:parseInt(req.params.id)
            }
        })
        console.log("deleted userdata",userdata);
        return res.status(200).json({message:"users deleted successfully", data:userdata, code:200})
    } catch (error) {
        if(error.code === "P2025"){
            return res.status(404).json({message:"user does not exist"})
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//PUTs
const updateUser=async(req,res)=>{
    try {
        console.log("user update API call..");
        const {name, email, password}=req.body;
        console.log("req.body to update :",req.body);
        const ciphertext =await CryptoJS.AES.encrypt(password,secretKey).toString()
        console.log("Cipher Text :", ciphertext);
        
        const findUser = await prisma.user.findFirst({
            where:{
                id:parseInt(req.params.id)
            }
        })
        if(!findUser){
            console.log("userId does not exist");
            return res.status(404).json({message:"User Not Found", code:404})
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
        return res.status(200).json({message:"user updated successfully", data:updatedUser, code:200})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export {createUser, getAllUser, deleteUser, updateUser};
