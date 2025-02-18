const express = require("express");
const app = express();
const userModal = require("./usermodel");
const PORT=3000;

app.get("/", (req, res) => {
  res.send("hey");
});

//create
app.get("/create", async(req, res) => {
  let createdUser = await userModal.create({
    name: "raj",
    email: "raj@gmail.com",
    username: "raj",
  });
  console.log(createdUser);
  res.send(createdUser)
});

//findOneAndUpdate
app.get('/update', async(req,res)=>{
    let updatedUser= await userModal.findOneAndUpdate({username:'hiren'},{name:'hiren parmar'}, {new: true})
    res.send(updatedUser);
    console.log(updatedUser);
})

//findOne
app.get('/read',async(req,res)=>{
    let users= await userModal.findOne({username:'raj'});
    res.send(users);
    console.log(users);
})

//find All
app.get('/findAll',async(req,res)=>{
    let allUsers= await userModal.find({});
    res.send(allUsers);
    console.log(allUsers);
})

//delete
app.get('/delete',async(req,res)=>{
    let deletedUser = await userModal.findOneAndDelete({username:'raj'});
    res.send(deletedUser);
    console.log(deletedUser);
})

//delete all
app.get('/deleteAll',async(req,res)=>{
    let deleteAll=await userModal.deleteMany({})
    res.send(deleteAll)
    console.log(deleteAll);
    
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
});
