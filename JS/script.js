alert("hello");

// Fundamentals of js
// arrays and objects
// functions return
// async js coding

//var arr =[1,2,3,4,"hey",{},true,function(){},[]]; //you can put any types of value in js array

// forEach map filter find indexOf

var arr = [1, 2, 3, 4]; //array
//forEach
arr.forEach(function (val) {
  console.log(val + " hello");
});

//map
var ans = arr.map(function (val) {
  return val * 2;
});
console.log(ans);

//filter
var ans2 = arr.filter(function (val) {
  if (val > 2) {
    return true;
  } else {
    return false;
  }
});
console.log(ans2);

//find
var ans3 = arr.find(function (val) {
  if (val === 2) return val;
});
console.log(ans3);

//indexOf
console.log(arr.indexOf(12));
console.log(arr.indexOf(2));

// objects {}
var obj = {
  roll: 48,
  name: "hiren",
  age: 21,
  stream: "mca",
  college: "gls university",
};
obj.age = 25;

console.log(obj);
console.log(obj.age);

var myArr = [10, 20, 30, 40, 50];
console.log("Array length", myArr.length);

//function
function abcd(a, b, c) {}
console.log("Function length", abcd.length);

console.log(typeof function () {}); //function
console.log("--------------------------");

function hiren() {
  return "hello world";
}
var myFun = hiren(); //call the function
console.log(myFun);

//async
/*async function first() {
    var blob=await fetch(`http://192.168.1.3:3001/api/v1/product/`)
    var res=await blob.json()
    console.log(res);  
}
first()*/

//master async js:-
// -> sync matlab ek ke baaddusraa hoga, jab tak ek command complete naa ho, dusra shuru nahi hoga
// -> async matlab saare kaam ek saath shuru kardo. jiska answer pahle aajaye uska jawaab dedena
// -> sync or async code writing difference:
// -> async: setTimeout, setInterval, promises, fetch, then catch, async await, axios, XMLHttpRequest

console.log("sync js ex :-");
console.log("hey");
console.log("hey 2");
console.log("hey 3");

console.log("async js ex :-");
console.log("aaaa");
//callback functions
setTimeout(function () {
  console.log("hello");
}, 2000);
console.log("bbb");

//promise
var myPromise = new Promise((resolve, reject) => {
  if (true) {
    return resolve();
  } else {
    return reject();
  }
});
myPromise
  .then(function () {
    console.log("resolve chala");
  })
  .catch(function () {
    console.log("reject chala");
  });

//Ex. user will ask for a number between 0 to 9 and if the number is below 5 resolve if not reject.

var p1=new Promise((resolve,reject)=>{
    return resolve("10 AM office aao")
})
var p2=p1.then(function(data){
    console.log(data);
    return new Promise(function(resolve,reject){
        return resolve("1 PM lunch break")
    })
})
var p3=p2.then(function(data){
    console.log(data);
    return new Promise(function(resolve,reject){
        return resolve("4 PM tea peo")
    })
})
p3.then(function(data){
    console.log(data); 
})

//Async await use:-

//without async await fetch api
/*function asyncFun(){
    fetch(`https://randomuser.me/api/`)
    .then(function(raw){
        return raw.json()
    })
    .then(function(data){
        console.log("res data:",data);
        
    })
}
asyncFun()*/

async function asyncFun(){
    let row = await fetch(`https://randomuser.me/api/`)
    let data= await row.json()
    console.log("res :",data);
}
asyncFun()