const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const PORT=3000;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
app.use(cookieParser());
app.get('/',function(req,res){
  let token=jwt.sign({email:"hiren12@gmail.com"},"secret");
  console.log(token);
  res.cookie("token",token);
  res.send('done.');
})
app.get('/read',function(req,res){
    //console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token,"secret");
    res.send(data);
    console.log(data);
    
})
app.listen(PORT,()=>{
    console.log(`server is ruuning on ${PORT}`);
})