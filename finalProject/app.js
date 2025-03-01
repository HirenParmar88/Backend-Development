import express from 'express';
import router from './router/index.js';
const app=express();
const PORT=process.env.PORT || 3000

app.use(express.json());
app.use("/", router);

app.get("/",(req,res)=>{
    res.send("Server is running..")
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})