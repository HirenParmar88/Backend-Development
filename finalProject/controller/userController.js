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
                password:true,
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

export {createUser, getAllUser};
