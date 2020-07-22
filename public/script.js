$(function () {

    let input = $('#inpbox')
    let add = $('#add')
    let reset = $('#reset')
    let sort = $('#sort')
    let cleanup = $('#cleanup')
    let list = $('#list')
    let sub = $('.subtext')
    let sampletext = true
    
    input[0].value = ""
    
    input[0].onclick = function () {
        input.val("")
        lightwhenadded()
    }


    input[0].oninput = function () {
        add[0].classList.add('active')
        reset[0].classList.add('active')
    }

    add.click(function () {
        additem()
        input.val("")
    });

    reset.click(function () {
        input.val("")
        lightwhenadded()
    })


    $.get('/todos',function (data) {
        if(data.length!==0){
            list.empty()
            sampletext= false
            for (const todo of data) {
                let li=$(`<li>${todo.task}</li>`)
                if(todo.done==true){
                    li[0].classList.add('strike')
                }
                list.append(li)
                //additem function called on all element
            }
            let alllielements = $('#list li')
            alllielements.click(strikeitem)
        
            alllielements.dblclick(delitems)
        }//make sure all elemnt have been created and added to dom
        else{
            let alllielements = $('#list li')
            alllielements.click(function (event) {
                if (event.target.classList[0] == "strike") {
                    event.target.classList.remove("strike")
                } else {
                    event.target.classList.add("strike")
                }
            })
            
            alllielements.dblclick(function () {
                event.target.remove()
                if($('#list li').length==0){
                    lightsortcleanelement()
                }        
            })
        }
    })
    
    
    function delitems(event) {
        let id= $.inArray(event.target,$('#list li').toArray())
        fetch('/todos/'+id,{
            method: 'DELETE'
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log("deleted"+ data.task)
            // console.log(data)
            event.target.remove()
            if($('#list li').length==0){
                lightsortcleanelement()
            }
        })
    }

    function additem() {
        if (input.val() == "") {
            console.log("error entry null")
            sub.text("Error: input something").css('color', 'red')
            input.css('border', 'solid red 2px')
        } else {
            sub.text("a short one line description of your task").attr('style', null)
            input.attr('style', null)
            if (sampletext) {
                list.empty()
                sampletext = false;
            }
            lightwhenadded()
            if($('#list li').length==0){
                sort[0].classList.add('active')
                cleanup[0].classList.add('active')
            }

            let inputtext = input.val()
            $.post('/todos',{task: inputtext, done: false},function name(data) {  //callback take two arguement data,message
                console.log(data)
                let element = $(`<li>${data[0].task}</li>`)
                list.prepend(element)
                element[0].onclick = strikeitem
                $(element[0]).dblclick(delitems)
            })
        }

    }

    function strikeitem(event) {
        // console.log(event)
        let id= $.inArray(event.target,$('#list li').toArray())
        //$('#list li') gives object but is array like
        //.toArray() convert jquery object to array
        // .inArray(event.target)
        let d 
        if (event.target.classList[0] == "strike") {
            d= false
        } else {
            d= true
        }
        //first request then strike when response come

        fetch('/todos/'+id,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                done: d
            })
        })
        .then(function (response) {
            // console.log(response)
            if(response.ok!==true){
                console.error("Error") //will show a detail error only if the error is from the server side from where response is coming 
                //error will come if server is unable to give response 
                //if error from client side like url not correct then //!Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://jsonplaceholder.typiicode.com/todos/1000. (Reason: CORS request did not succeed). Uncaught (in promise) TypeError: NetworkError when attempting to fetch resource.
                //error like /todoos or /todos/20000 are server error means the request reached the server but server responded error
            }
            return response.json()
        })
        .then(function (data) {
            if (event.target.classList[0] == "strike") {
                event.target.classList.remove("strike")
            } else {
                event.target.classList.add("strike")
            }
            console.log(data)
        })
    }


    function lightwhenadded() {
        add[0].classList.remove('active')
        reset[0].classList.remove('active')
    }


    input[0].addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            additem()
            input.val("")
        }
        if(input.val()==""){
            lightwhenadded()
        }
    })

    function lightsortcleanelement() {
        sort[0].classList.remove('active')//because already dark
        cleanup[0].classList.remove('active')
    }
    
    sort.click(sortitems)

    function sortitems(event) {
        fetch('todos/sort')
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            // console.log(data)
            let removeditems = $('.strike').remove()
            list.append(removeditems)
        })
    }

    cleanup.click(clean)

    function clean(event) {
        fetch('/todos/cleanup').then(function (response) {
            return response.json()
        }).then(function (data) {
            $('.strike').remove()
        })
        
    }
    

})

{/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}

// $.ajax({
//     type: 'PATCH',
//     url: '/todos/'+id,
//     data: JSON.stringify(patch),
//     processData: false,
//     contentType: 'application/merge-patch+json',
    
//     /* success and error handling omitted for brevity */
//  });                     

// fetch("https://jsonplaceholder.typicode.com/todos/").then((response)=> {return response.json()})
// .then(function (data) {
//     console.log(data)
// })


// fetch("/todos/"+id,{
//     method: 'DELETE',
//     body:{}
// })
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     event.target.remove()
//     console.log("deleted"+ data.task)
//     if($('#list li').length==0){
//         lightsortcleanelement()
//     }
// })

// $.ajax({
//     url: '/todos'+id,
//     type: 'DELETE',
//     success: function (data) {
//         event.target.remove()
//         console.log("deleted"+ data.task)
//         if($('#list li').length==0){
//             lightsortcleanelement()
//         }

//     },
//     error: function () {
//         console.log("error")
//     }
// })