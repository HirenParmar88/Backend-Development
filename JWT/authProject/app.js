const express=require('express');
const morgan=require('morgan');
const createError=require('http-errors')
require('dotenv').config()

const AuthRoute=require('./Routes/Authroute');

const app=express()
const PORT=process.env.PORT || 3000

app.get('/',(req,res,next)=>{
    res.send("WELCOME")
})


app.use((req,res,next)=>{
    try{
        next()
    }
    catch(err){
        return res.status(500).send({
            error:{
                status: err.status || 500,
                message:err.message,
            }
        })
    }
})

app.use('/auth', AuthRoute);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})