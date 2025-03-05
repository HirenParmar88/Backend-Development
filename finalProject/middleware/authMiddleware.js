//import { verify } from "jsonwebtoken";
import pkg from "jsonwebtoken"
const {verify} = pkg;
import { secretKey } from "../utils/constant.js";
import rateLimit from "express-rate-limit";

const verifyToken=async(req, res, next)=> {
  console.log("Middleware called..");
  const bearerHeader = req.headers.authorization;
  console.log("bearer Header :", bearerHeader);
  console.log("token req.headers :", req.headers);
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    try {
      const data = await verify(token, secretKey);    //verify token still valid or not
      console.log("token data use for middleware :", data);
      req.id = data.id;
      req.role = data.role;
      console.log("req.id :-", req.id);
      console.log("req.role :-", req.role);
      console.log("Authentication successfully");
      next();
    } catch (error) {
      res.send({code: 404,message: "Token is epired"});
    }
  } else {
    res.send({code:500,message: "Token does not exist"});
  }
}

const adminAccess=async(req,res,next)=>{
  console.log("Admin Accesss Middleware called..");
  const bearerHeader = req.headers.authorization;
  console.log("bearer Header :", bearerHeader);
  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];
    try {
      const data = await verify(token, secretKey);    //verify token still valid or not
      console.log("Admin Middleware data:", data);
      if(data.role !== 'admin'){
        return res.status(403).json({message:"Access denied : Admin only", code:403});
      }
      req.id = data.id;
      req.role = data.role;
      console.log("req.id :-", req.id);
      console.log("req.role :-", req.role);
      console.log("Role Based Authentication successfully");
      next();
    } catch (error) {
      res.send({code: 401,message: "Invalid or expired token"});
    }
  } else {
    return res.status(401).json({ message: "Token missing", code:401});
  }
}

// Set up rate-limiting for login route
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per `windowMs`
  message: "Too many login attempts, please try again later after 15 min",
  statusCode: 429, // return 429 status code (Too many requests)
  headers: true, // Send rate limit headers in response
});

export { verifyToken, adminAccess , loginRateLimiter};