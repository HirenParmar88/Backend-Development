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
        code: 200,
        success:true,
        message: "Accessories added successfully",
        data: addedAccessories,
      });
  } catch (error) {
    if(error.isJoi === true){
        error.status = 422
        return res.status(422).json({code:422, success:false, message: error.details })
    }
    console.log(error);
    if(error.code === 'P2003'){
        return res.status(400).json({code:400, success:false, message:"Foreign key constraint violation: Invalid productId"})
    }
    return res.status(500).json({code:500, success:false, message:"Internal Server Error"})
  }
};

//GET 
const getAllAccessories=async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const rowsPerPage = parseInt(req.query.rowsPerPage) || 10;
    const offset = (page - 1) * rowsPerPage;
    try {
        console.log("get accessories api call..");
        const getAccessoriesData = await prisma.accessories.findMany({
            select:{
                id:true,
                accessory_name:true,
                productId:true,
            },
            orderBy:{
                id: "asc",
            },
            skip:offset,
            take:rowsPerPage,
        })
        console.log("getAccessoriesData data :",getAccessoriesData);
        return res.status(200).json({code:200, success:true, page:page, rowsPerPage:rowsPerPage, message:"Get All Accessories Successfully", data:getAccessoriesData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({code:500, success:false, message:"Internal server error"})
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
        return res.status(200).json({code:200, success:true, message:"Accessories deleted successfully", data: deletdAccessories })
    } catch (error) {
        console.log(error);
        if(error.code === 'P2025'){
            return res.status(404).json({message:"Recode Does Not Exist.", code:404, success:false})
        }
        return res.status(500).json({code:500, success:false, message:"Internal server error"})
    }
}

//update
const updateAccessories = async(req,res)=>{
    try {
        console.log("update accessories api call..");
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
        return res.status(200).json({code:200, success:true, message:"Accessories Updated Successfully", data:updatedAccessoriesData })
    } catch (error) {
        if(error.isJoi === true){
            error.status = 422
            return res.status(422).json({message: error.details, code:422, success:false})
        }
        console.log(error);
        if(error.code === 'P2025'){
            return res.status(404).json({message:"Record Does Not Exist.", code:404, success:false})
        }
        return res.status(500).json({message:"Internal Server Error", code:500, success:false}) 
    }
}
export {addAccessories, getAllAccessories, deleteAccessories, updateAccessories}
