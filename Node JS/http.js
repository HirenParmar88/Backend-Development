// protocols - rules
// http rules os mein pre installed aate hain

const http= require('http')

//create server in node js
const server = http.createServer(function(req,res){
    res.end('Hello world');
    console.log("server is running");
    
})
server.listen(3000);