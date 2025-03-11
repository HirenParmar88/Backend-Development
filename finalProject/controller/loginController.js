import prisma from "../db/db.config.js";
import CryptoJS from "crypto-js";
import { secretKey } from "../utils/constant.js";
import jwt from "jsonwebtoken";

//POST
const login = async (req, res) => {
  try {
    console.log("LOGIN ...");
    const { name, password } = req.body;
    console.log("name:", name);
    console.log("password:",password);

    // Validate input fields
    if (!name || name.trim() === "") {
      return res.status(400).json({ code: 400, success: false, message: "Username cannot be empty" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ code: 400, success: false, message: "Password cannot be empty" });
    }

    const userLogin = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });

    if (!userLogin) {
      return res.status(401).json({code:400,success:false, message: "Invalid username or password" });
    }
    const decPassWord = CryptoJS.AES.decrypt(userLogin.password,secretKey).toString(CryptoJS.enc.Utf8);
    console.log("decPassWord :-", decPassWord);

    if(decPassWord != password){
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid password" });
    }

    //generate jwt token
    const token = jwt.sign(
      {
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email,
        role: userLogin.role
      },
      secretKey,
      { expiresIn: "10h" }
    );
    //to update token
    const updatedUserdData = await prisma.user.update({
        where:{
            id:userLogin.id,
        },
        data:{
            jwt:token
        },
        select:{
          _count:true,
          createdAt:true,
          id:true,
          jwt:true,
          name:true,
          role:true,
          updatedAt:true,
        }
    })
    console.log("Token :", token);
    console.log("Login Successfully");
    return res
      .status(200)
      .json({code:200, success:true, message: "Login Successfully", data: updatedUserdData, token:token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" , code:500});
  }
};
export default login;