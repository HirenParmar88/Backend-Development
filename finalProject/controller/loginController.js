import prisma from "../db/db.config.js";
import CryptoJS from "crypto-js";
import { secretKey } from "../utils/constant.js";
import jwt from "jsonwebtoken";

//POST
const login = async (req, res) => {
  try {
    console.log("LOGIN ...");
    const { name, password } = req.body;
    console.log(req.body);
    const userLogin = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    if (!userLogin) {
      console.log("Invalid username or password");
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const plaintext = CryptoJS.AES.decrypt(
      userLogin.password,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    console.log("plaintext :-", plaintext);
    console.log("userLogin data :", userLogin);

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
    console.log("Token :", token);
    //to update token
    await prisma.user.update({
        where:{
            id:userLogin.id,
        },
        data:{
            jwt:token
        }
    })
    console.log("Login Successfully");
    return res
      .status(200)
      .json({ message: "Login Successfully", data: userLogin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default login;
