import prisma from "../db/db.config.js";
import CryptoJS from "crypto-js";
import { secretKey } from "../utils/constant.js";
import jwt from "jsonwebtoken";

//POST
const login = async (req, res) => {
  try {
    console.log("LOGIN ...");
    const { name, password } = req.body;
    console.log("name:" , name);
    console.log("password",password);

    const userLogin = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    console.log('user data',userLogin);
    
    if (!userLogin) {
      console.log("Invalid username or password");
      return res.status(400).json({ message: "Invalid username or password" });
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
        name: userLogin.name,
        id: userLogin.id,
        email: userLogin.email,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    //to update token
    const updateUserData = await prisma.user.update({
      where:{
        name:userLogin.name,
      },
      data:{
        jwt:token
      }
    })
    console.log("Token :", token);
    console.log("Login Successfully");
    return res
      .status(200)
      .json({ message: "Login Successfully", data: updateUserData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default login;
