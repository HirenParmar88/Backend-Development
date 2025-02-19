//eventLoop works in Node.js
/*
console.log('start');   //sync
setTimeout(()=>{
    console.log('setTimeout called');
},0);
setImmediate(()=>{
    console.log('setImmediate called.');
});
Promise.resolve().then(()=>{
    console.log('Promise resolved');
});
process.nextTick(()=>{
    console.log('process.nextTick call..');
})
console.log('end'); //sync
*/

//Hoisting in JS

getName()
console.log(x);
console.log(getName);

var x=7;
//console.log(x);

function getName(){
    console.log('har har mahadev');
}


//Spread operator and Rest operator:
//1) spread operator(...) :-
console.log('***********************');

//1.1 Using Spread with Arrays
const arr1=[1,2,3];
const arr2=[4,5,6];
const marged=[...arr1, ...arr2];
console.log(marged);

//1.2 Copying an Array
const original=[1,2,3];
const copy=[...original];
console.log(copy);

//1.3 Using Spread with Objects
const obj1={a:1, b:2, c:3};
const obj2={d:4, e:5, f:6};
const mergedObj={...obj1, ...obj2}
console.log(mergedObj);

//1.4 Spread in Function Arguments
function sum(a,b,c){
    return a+b+c;
}
const numbers=[10,20,30];
console.log(...numbers);

//2) rest operator(...) :-

//2.1 Rest in Function Parameters
function sumAll(...num){
    return num.reduce((acc,num)=> acc + num, 0)
}
console.log(sumAll(1,2,3,4,5)); //15

//2.2 Rest in Destructuring
const [first, second, ...rest]=[10,20,30,40,50];
console.log(first);
console.log(second);
console.log(rest);