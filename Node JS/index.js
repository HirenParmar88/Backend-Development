const fs = require('fs')

// writeFile
// fs.writeFile('hello.txt',"my name is hiren",function(err){
//     if(err) console.log(err);
//     else console.log("done");
// })

// appenFile
/*fs.appendFile('hello.txt'," parmar",function(err){
    if(err) console.log(err);
    else console.log("added");
    })
    
// rename
fs.rename('hello.txt','hey.txt', function(err){
    if(err) console.log(err);
    else console.log("rename done");
        
})*/
       
// copyFile
// fs.copyFile("hello.txt", "./myFolder/copy.txt",function(err){
//     if(err) console.log(err.message);
//     else console.log("copy file done");
// })

// unlink or delete file
/*fs.unlink("hello.txt", function(err){
    if(err) console.log(err);
    else console.log("removed");
})*/

//rmdir
/*fs.rmdir("./copy",{recursive: true} ,function(err){
    if(err) console.log(err);
    else console.log("folder removed");
})*/

// mkdir create a folder using
// fs.mkdir('myFolder',(err)=>{
//     if(err){
//         console.error(err)
//     }else{
//         console.log('new directory created'); 
//     }
// })

//readdir - read folder
// fs.readdir('myFolder',(err, files)=>{
//     if(err){
//         console.error(err);
//         return;
//     }else{
//         console.log('read directory content success :',files); 
//     }
// })

// readFile content
fs.readFile('./myFolder/copy.txt','utf-8',(err,data)=>{
    if(err){
        console.error(err);
        return;
    }else{
        console.log("File content :",data);
    }
})