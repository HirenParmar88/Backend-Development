import express from 'express';
import router from './Routes/app.js';

const app=express()
const PORT=process.env.PORT || 3000
//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    return res.send('hello');
})

app.use(router)

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    
})