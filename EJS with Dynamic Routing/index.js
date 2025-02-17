const express = require('express');
const app = express();
const path= require('path');

//parsers for form
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/', function(req,res){
    //res.send('server is running..')
    res.render('index')
})
app.get('/profile/:username', function(req,res){
    res.send(`Welcome, ${req.params.username}`)
    console.log(req.params);
    console.log(req.params.username);
    //res.send('chal raha hai..')
})
app.get('/profile/:username/:age', function(req,res){
    res.send(req.params)
    console.log(req.params);
    console.log(req.params.username);
    console.log(req.params.age);
})
app.listen(3000,function(){
    console.log("Server Running..");
})