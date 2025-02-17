const express = require('express')
const app = express()
//console.log(app);

//Routing
// app.get('/',function(req, res){
//     res.send("server is running..")
// })
// app.listen(3000)

//request handler middleware hote hai:-
//app.get(Router, requestHandler)
/*app.get('/', function(req,res){
    res.send("Home Page")
})
app.get('/profile', function(req,res){
    res.send("Profile Page")
})
app.get("/about", function(req,res){
    res.send("About Page");
    
})
app.listen(3000)*/

//Middleware
/*app.use(function(req,res,next){
    console.log('middleware chala');
    next();
})
app.use(function(req,res,next){
    console.log("middleware 2 ");
    next();
})
app.get('/',function(req,res){
    res.send("server is running..")
})
app.get('/login',function(req,res){
    res.send('Login page');
})
app.listen(3000)*/

//Error Handler
app.use(function(req,res,next){
    console.log("Middleware run hua..");
    next()
})
app.get('/', function(req,res,next){
    return next(new Error("Not implemented"))
})
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('something went wrong')
})
app.listen(3000)