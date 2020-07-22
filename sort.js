let temp=[]
let tempn= 0
function sort1(arr) {
    for (const i of arr) {
        if(i.done==true){
            temp[tempn]=i 
            tempn++
            arr.splice(i,1)
        }
    }
    console.log(arr)
    console.log(temp)
}

let a=[
    { task: '4', done: 'false' },
    { task: '3', done: true },
    { task: '2', done: true },
    { task: '4', done: 'false' },
    { task: '1', done: true }
  ]

// sort1(a)
// console.log(a)

// let b=[0,1,2,3,4,5]

// b.splice(1,1)
// console.log(b)

function sort2(arr) {
    let ar1= arr.filter((data)=> {return data.done==false})
    console.log(ar1)
    let ar2= arr.filter((data)=> {return data.done==true})
    console.log(ar2)
    ar3=[...ar1,...ar2]
    return ar3;
}

function sort3(arr) {
    var temp1=[]
    var temp2=[]
    var m=0
    var n=0
    for (var i of arr) {
        if(i.done==true){
            temp1[m]=i
            m++;
        }else{
            temp2[n]=i
            n++;
        }
    }
    console.log(temp1)
    console.log(temp2)
    
    var x= arr.length
    arr.splice(0,x)
    for(let i=0;i<x;i++){
        if(i<n){
            arr[i]= temp2[i]
        }else{
            arr[i]=temp1[i-n]
        }
    }
}

// sor3(a)

// console.log(a)


function cleanup(arr) {
    c=arr.filter(function (data) {
        return (data.done==false)
    })
    return c
}

// b= cleanup(a)

// console.log(b)

function sort4(arr) {
    for (const i in arr) {
        if(arr[i].done==true){
            arr.push(arr.splice(i,1))
        }
    }
}

// sort4(a)

// console.log(a)

function cleanup1 (arr) {
    for(let i=0;i<arr.length;i++){
        if(arr[i].done===true){
            arr.splice(i,1)
            i--;
        }
    }
}

cleanup1(a)

console.log(a)