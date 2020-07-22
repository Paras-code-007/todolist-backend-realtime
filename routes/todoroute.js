const route= require('express').Router()

let todos=[]

route.get('/',function (req,res) {
    res.send(todos)
})

route.post('/',function (req,res) {
    todos.unshift({task: req.body.task, done: req.body.done})
    // console.log(todos[0])
    console.log(todos)
    res.send(todos)
})//post req on same path as the 


route.get('/sort',function (req,res) {
    sort3(todos)   
    console.log("sorted")
    console.log(todos)
    res.send(todos)
})

route.get('/cleanup',function (req,res) {
    cleanup(todos)
    console.log(todos)
    res.send(todos)
})


route.patch('/:id',function (req,res) {
    todos[req.params.id].done= req.body.done
    // console.log(todos[req.params.id])
    console.log(todos)
    res.send(todos[req.params.id])  //had to return json data because using json parsing in between the fetch promise
})

route.delete('/:id',function (req,res) {
    // console.log(req.params.id,req.headers)
    console.log("deleted"+todos[req.params.id].task)
    res.send(todos[req.params.id])
    todos.splice(req.params.id,1)
    console.log(todos)
})

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

function cleanup (arr) {
    for(let i=0;i<arr.length;i++){
        if(arr[i].done===true){
            arr.splice(i,1)
            i--;
        }
    }
}


module.exports= route