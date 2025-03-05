import prisma from "../db/db.config.js";
import { accessoriesSchema, accessoriesUpdateSchema } from "../validations/accessoriesValidation.js";

//POST
const addAccessories = async (req, res) => {
  try {
    console.log("add accessories api call..");
    const { accessory_name, productId } = req.body;
    console.log("add accessories req.body :",req.body);
    const result = await accessoriesSchema.validateAsync(req.body)
    console.log("result validate accessories:-", result);
    
    const addedAccessories = await prisma.accessories.create({
      data: {
        accessory_name: result.accessory_name,
        productId: parseInt(productId),
      },
    });
    console.log("addedAccessories :", addedAccessories);
    return res
      .status(200)
      .json({
        message: "Accessories added successfully",
        data: addedAccessories,
        code: 200,
      });
  } catch (error) {
    if(error.isJoi === true){
        error.status = 422
        return res.status(422).json({message: error.details, code:422})
    }
    console.log(error);
    if(error.code === 'P2003'){
        return res.status(400).json({message:"Foreign key constraint violation: Invalid productId", code:400, success:false})
    }
    return res.status(500).json({message:"Internal Server Error", code:500})
  }
};

//GET 
const getAllAccessories=async(req,res)=>{
    try {
        console.log("get accessories api call..");
        const getAccessoriesData = await prisma.accessories.findMany()
        console.log("getAccessoriesData data :",getAccessoriesData);
        return res.status(200).json({message:"Get All Accessories Successfully", data:getAccessoriesData, code:200})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//delete
const deleteAccessories = async(req,res)=>{
    try {
        console.log("delete accessories api call..");
        const deletdAccessories = await prisma.accessories.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        console.log("deleted user data", deletdAccessories);
        return res.status(200).json({message:"Accessories deleted successfully", data: deletdAccessories, code:200})
    } catch (error) {
        console.log(error);
        if(error.code === 'P2025'){
            return res.status(404).json({message:"Recode Does Not Exist.", code:404, success:false})
        }
        return res.status(500).json({message:"Internal server error", code:500})
    }
}

//update
const updateAccessories = async(req,res)=>{
    try {
        console.log("update accessories api call..");
        const {accessory_name}=req.body;
        console.log("req.body :-", req.body);
        const result = await accessoriesUpdateSchema.validateAsync(req.body)
        console.log(result);
        
        const updatedAccessoriesData = await prisma.accessories.update({
            data:{
                accessory_name:result.accessory_name
            },
            where:{
                id:parseInt(req.params.id)
            }
        })
        console.log("updatedAccessoriesData :", updatedAccessoriesData);
        return res.status(200).json({message:"Accessories Updated Successfully", data:updatedAccessoriesData, code:200})
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422})
        }
        console.log(error);
        if(error.code === 'P2025'){
            return res.status(404).json({message:"Record Does Not Exist.", code:404, success:false})
        }
        return res.status(500).json({message:"Internal Server Error", code:500}) 
    }
}
export {addAccessories, getAllAccessories, deleteAccessories, updateAccessories}
