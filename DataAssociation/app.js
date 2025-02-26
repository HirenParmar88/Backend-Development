const express = require('express');
const app=express();
const PORT=3000;
const userModel=require("./models/user");
const postModel=require("./models/posts");

app.get("/", function(req,res){
    res.send('Har Har Mahadev .');
})

app.get('/create',async function(req,res){
    let user1=await userModel.create({
        username:"hiren",
        age:25,
        email:"hiren@gmail.com",
    })
    res.send(user1);
})

app.get('/post/create',async function(req,res){
   let post = await postModel.create({
    postdata:"hello guys, how are you?",
    user:"67bf1c90289cc18053224b06"
   })

   let user=await userModel.findOne({_id:"67bf1c90289cc18053224b06"});
   user.posts.push(post);
   await user.save(); 
   res.send({post, user});
})
app.listen(PORT,()=>{
    console.log("server is running..");
})