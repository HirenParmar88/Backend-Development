alert("hello")

// Fundamentals of js
// arrays and objects
// functions return
// async js coding

//var arr =[1,2,3,4,"hey",{},true,function(){},[]]; //you can put any types of value in js array

// forEach map filter find indexOf

var arr=[1,2,3,4];  //array
//forEach
arr.forEach(function(val){
    console.log(val+" hello");  
})

//map
var ans = arr.map(function(val){
    return val*2;
})
console.log(ans);

//filter
var ans2=arr.filter(function(val){
    if(val >2){
        return true;
    }else{
        return false;
    }
})
console.log(ans2);

//find
var ans3=arr.find(function(val){
    if(val === 2) return val;
})
console.log(ans3);

//indexOf
console.log(arr.indexOf(12));
console.log(arr.indexOf(2));

// objects {}
var obj={
    roll:48,
    name:'hiren',
    age:21,
    stream:'mca',
    college:'gls university'
}
obj.age=25;

console.log(obj);
console.log(obj.age);

var myArr=[10,20,30,40,50]
console.log("Array length",myArr.length);

//function
function abcd(a,b,c){

}
console.log("Function length",abcd.length);

console.log(typeof function(){});   //function
console.log("--------------------------");

function hiren(){
    return 'hello world';
}
var myFun=hiren();    //call the function
console.log(myFun);

