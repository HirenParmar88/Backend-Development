import prisma from "../db/db.config.js";
import { secretKey } from "../utils/constant.js";
import jwt from "jsonwebtoken";

//POST
const logout = async (req, res) => {
  try {
    console.log("Logout called...");

    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("tokent to logout :-", token);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      const { id } = decoded;
      const findUser = await prisma.user.findFirst({
        where: {
          name:req.body.name
        },
        select:{
          jwt:true,
          name:true,
          email:true,
          password:true
        }
      });
      console.log("findUser data :", findUser);
      if (!findUser) {
        return res.status(400).json({ message: "User not found" });
      }
      const userLogout=await prisma.user.update({
        where:{
          id:req.id,
        },
        data:{
          jwt: null,
        }
      })
      console.log("Logout Successfully");
      return res
        .status(200)
        .json({ message: "Logout Successfully", data: userLogout });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default logout;
