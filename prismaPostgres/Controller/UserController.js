import prisma from "../DB/db.config.js";

export const createUser=async(req,res)=>{
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required." });
    }
    console.log(req.body);
    const findUser=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(findUser){
        return res.status(400).json({message:"user is allready exist"})
    }
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
    return res.status(200).json({message:"User Created", data:newUser})
}

export const getAllUser = async(req,res)=>{
    try {
        const getData = await prisma.user.findMany();
        console.log(getData);
        res.status(200).json({message:"get all user data", data:getData})
        return;
        
    } catch (error) {
        res.status(400).json({message:"error are occured!"})
    }
}

export const updateUser = async(req,res)=>{
    try {
        console.log("update user function call...");
        const user=await prisma.user.update({
            where:{id:parseInt(req.params.id)},
            data:{
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            }
        });
        console.log("Updated Data :",user);
        return res.status(200).json({message:"user updated successfully"});
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"error occured to update user !"});
    }
}

export const deleteUser=async(req,res)=>{
    console.log("delete function call..");
    try {
        const user=await prisma.user.delete({
            where:({id:parseInt(req.params.id)})
        })
        console.log("deleted data :", user);
        return res.status(200).json({message:"deleted success"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"error are occured to delete.."})
    }
}